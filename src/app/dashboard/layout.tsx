import { cookies } from "next/headers";
import Link from "next/link";
import { LayoutGrid, Puzzle, UserCircle, UserPlus } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { LogoutButton } from "./logout-button";

const SESSION_COOKIE = "simplifyerp_session";

const MODULE_LABELS: Record<string, string> = {
  DIGITAL_MENU: "Cardápio Digital",
  POS: "PDV",
  INVENTORY: "Estoque",
  FINANCE: "Financeiro",
  FISCAL_REPORTS: "Fiscal e Relatórios",
};

interface ModuleStatus {
  module: string;
  enabled: boolean;
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  let enabledModules: ModuleStatus[] = [];
  let isSuperAdmin = false;

  if (token) {
    try {
      const { modules } = await apiFetch<{ modules: ModuleStatus[] }>("/v1/establishment/modules", { token });
      enabledModules = modules.filter((m) => m.enabled);
    } catch {
      enabledModules = [];
    }

    try {
      const { account } = await apiFetch<{ account: { role: string } }>("/v1/auth/me", { token });
      isSuperAdmin = account.role === "super_admin";
    } catch {
      isSuperAdmin = false;
    }
  }

  return (
    <div className="min-h-screen flex bg-stone-950 text-paper">
      <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col p-6">
        <Link href="/" className="inline-flex items-center gap-1 mb-10">
          <span className="font-sans font-bold text-lg text-paper">Simplify</span>
          <span className="font-display italic font-medium text-lg text-amber-400">ERP</span>
        </Link>

        <nav className="flex-1 space-y-1 text-sm">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-stone-300 hover:text-paper hover:bg-white/5 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            Visão geral
          </Link>

          {enabledModules.map(({ module }) => (
            <span
              key={module}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-stone-500 cursor-default"
              title="Módulo habilitado — tela ainda não implementada"
            >
              <Puzzle className="w-4 h-4" />
              {MODULE_LABELS[module] ?? module}
            </span>
          ))}

          <Link
            href="/dashboard/modulos"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-stone-300 hover:text-paper hover:bg-white/5 transition-colors"
          >
            <Puzzle className="w-4 h-4" />
            Módulos
          </Link>

          {isSuperAdmin && (
            <Link
              href="/dashboard/tenants/novo"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-stone-300 hover:text-paper hover:bg-white/5 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Novo tenant
            </Link>
          )}

          <Link
            href="/dashboard/conta"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-stone-300 hover:text-paper hover:bg-white/5 transition-colors"
          >
            <UserCircle className="w-4 h-4" />
            Minha conta
          </Link>
        </nav>

        <LogoutButton />
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
