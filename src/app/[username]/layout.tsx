import { Sidebar } from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const expandedCookie = cookieStore.get("sidebar_expanded");
  const defaultExpanded = expandedCookie ? expandedCookie.value === "true" : true;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar defaultExpanded={defaultExpanded} />
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}
