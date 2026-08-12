import type { Metadata } from "next";

import { EmptyState } from "@/components/admin/empty-state";

export const metadata: Metadata = {
  title: "Usuarios",
  robots: { index: false, follow: false },
};

export default function AdminUsersPage() {
  return (
    <EmptyState
      title="Usuarios"
      description="Gestiona el equipo que publica en el blog."
    />
  );
}