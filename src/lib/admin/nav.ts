export interface AdminNavItem {
  href: string;
  label: string;
  description: string;
}

export const ADMIN_NAV: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Resumen",
    description:
      "Vista general del blog: actividad, publicaciones y accesos rápidos.",
  },
  {
    href: "/admin/articulos",
    label: "Artículos",
    description:
      "Crea, edita y publica las historias del blog desde un solo lugar.",
  },
  {
    href: "/admin/categorias",
    label: "Categorías",
    description: "Organiza las historias por secciones del blog.",
  },
  {
    href: "/admin/etiquetas",
    label: "Etiquetas",
    description: "Conecta historias relacionadas entre sí.",
  },
  {
    href: "/admin/usuarios",
    label: "Usuarios",
    description: "Gestiona el equipo que publica en el blog.",
  },
  {
    href: "/admin/roles",
    label: "Roles",
    description: "Define permisos y niveles de acceso del panel.",
  },
];