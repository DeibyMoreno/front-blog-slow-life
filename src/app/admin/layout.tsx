import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-sand lg:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
          {children}
        </div>
      </main>
    </div>
  );
}