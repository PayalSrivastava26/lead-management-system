import { supabase } from "@/lib/supabase";

export async function dispatchAgent(lead: any) {
  console.log("🟢 Dispatch Agent: Sending to external API...");

  let retryCount = 0;
  let responseCode: number | null = null;
  let success = false;

  while (retryCount <= 2 && !success) {
    try {
      console.log(`🔁 Attempt ${retryCount + 1}`);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead_email: lead.email,
            priority: lead.priority,
          }),
        }
      );

      responseCode = response.status;

      if (response.ok) {
        success = true;
        break;
      }
    } catch (err) {
      console.log("API Call Error:", err);
    }

    retryCount++;
  }

  // Update DB based on result
  const finalStatus = success ? "completed" : "api_failed";

  const { error } = await supabase
    .from("leads")
    .update({
      status: finalStatus,
      api_response_code: responseCode,
      retry_count: retryCount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", lead.id);

  if (error) {
    console.log("Dispatch Update Error:", error);
  }

  console.log("✅ Final Status:", finalStatus);

  return finalStatus;
}