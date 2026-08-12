import type { Metadata } from "next";

import { EmptyState } from "@/components/admin/empty-state";

export const metadata: Metadata = {
  title: "Roles",
  robots: { index: false, follow: false },
};

export default function AdminRolesPage() {
  return (
    <EmptyState
      title="Roles"
      description="Define permisos y niveles de acceso del panel."
    />
  );
}