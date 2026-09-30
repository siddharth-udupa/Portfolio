import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/session";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <AdminShell email={session.user.email}>{children}</AdminShell>;
}
