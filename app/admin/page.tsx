export const dynamic = "force-dynamic";
export const revalidate = 0;
import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading leads</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Admin Dashboard
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b p-3 text-left">Name</th>
                <th className="border-b p-3 text-left">Email</th>
                <th className="border-b p-3 text-left">Priority</th>
                <th className="border-b p-3 text-left">Status</th>
                <th className="border-b p-3 text-left">API Code</th>
                <th className="border-b p-3 text-left">Retries</th>
                <th className="border-b p-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {leads?.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="border-b p-3">{lead.name}</td>
                  <td className="border-b p-3">{lead.email}</td>
                  <td className="border-b p-3">
                    {lead.priority || "-"}
                  </td>
                  <td className="border-b p-3">
                    {lead.status || "-"}
                  </td>
                  <td className="border-b p-3">
                    {lead.api_response_code ?? "-"}
                  </td>
                  <td className="border-b p-3">
                    {lead.retry_count ?? 0}
                  </td>
                  <td className="border-b p-3">
                    {new Date(
                      lead.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}