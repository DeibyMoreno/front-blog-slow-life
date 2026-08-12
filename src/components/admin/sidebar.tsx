import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { NavLink } from "@/components/admin/nav-link";
import { Logo } from "@/components/site/logo";
import { ADMIN_NAV } from "@/lib/admin/nav";

export async function Sidebar() {
  const session = await auth();
  const user = session?.user;

  return (
    <aside className="flex w-full flex-col border-linen bg-cream lg:w-72 lg:shrink-0 lg:border-r">
      <div className="flex items-center justify-center border-b border-linen px-5 py-4 lg:border-b-0 lg:px-3 lg:py-3">
        <Logo size="30" />
      </div>

      <nav aria-label="Módulos del panel" className="min-h-0 lg:flex-1 lg:overflow-y-auto">
        <ul className="flex gap-1 overflow-x-auto px-4 py-3 lg:flex-col lg:overflow-x-hidden lg:px-3 lg:py-2">
          {ADMIN_NAV.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-linen p-5 lg:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">
              {user?.name ?? "Administrador"}
            </p>
            {user?.role ? (
              <p className="mt-0.5 text-xs text-stone">{user.role}</p>
            ) : null}
          </div>
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}