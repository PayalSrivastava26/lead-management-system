import { NextResponse } from "next/server";
import { intakeAgent } from "../../../lib/agents/intakeAgent";
import { qualificationAgent } from "../../../lib/agents/qualificationAgent";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // 1️⃣ Intake validation
    const lead = intakeAgent(body);

    // 2️⃣ Qualification
    const qualified = qualificationAgent(lead);

    if (!qualified) {
      return NextResponse.json(
        { error: "Lead not qualified" },
        { status: 400 }
      );
    }

    // 3️⃣ Insert initial row (pending state)
    const { data: inserted, error: insertError } = await supabase
      .from("leads")
      .insert([
        {
          name: qualified.name,
          email: qualified.email,
          message: qualified.message,
          source: qualified.source,
          status: "pending",
          retry_count: 0,
        },
      ])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      );
    }

    // 4️⃣ Determine priority
    const priority = qualified.message
      .toLowerCase()
      .includes("urgent")
      ? "high"
      : "normal";

    // 5️⃣ Simulate external API call
    let retryCount = 0;
    let apiCode = 200;
    let status = "completed";

    try {
      // Simulate API call
      const fakeApiCall = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
      });

      apiCode = fakeApiCall.status;

      if (!fakeApiCall.ok) {
        throw new Error("External API failed");
      }

    } catch {
      retryCount = 1;
      status = "failed";
      apiCode = 500;
    }

    // 6️⃣ Update same row
    await supabase
      .from("leads")
      .update({
        priority,
        status,
        api_response_code: apiCode,
        retry_count: retryCount,
      })
      .eq("id", inserted.id);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}