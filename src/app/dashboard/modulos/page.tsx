import { cookies } from "next/headers";
import { apiFetch, ApiError } from "@/lib/api";
import { ErrorBanner } from "@/components/error-banner";
import { ModuleToggle } from "./module-toggle";

const SESSION_COOKIE = "simplifyerp_session";

const MODULE_LABELS: Record<string, { name: string; description: string }> = {
  DIGITAL_MENU: { name: "Cardápio Digital", description: "Atendimento de mesa via QR Code." },
  POS: { name: "PDV", description: "Frente de caixa: itens, descontos, pagamento." },
  INVENTORY: { name: "Estoque & Insumos", description: "Ficha técnica, baixa automática, curva ABC." },
  FINANCE: { name: "Gestão Financeira", description: "Contas a pagar/receber, fluxo de caixa." },
  FISCAL_REPORTS: { name: "Fiscal e Relatórios", description: "Emissão de notas fiscais e relatórios." },
};

interface ModuleStatus {
  module: string;
  enabled: boolean;
}

export default async function ModulosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  let modules: ModuleStatus[] = [];
  let error: ApiError | null = null;

  if (token) {
    try {
      ({ modules } = await apiFetch<{ modules: ModuleStatus[] }>("/v1/establishment/modules", { token }));
    } catch (err) {
      error = err instanceof ApiError ? err : new ApiError("Não foi possível carregar os módulos.", 500);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Módulos</h1>
      <p className="text-stone-400 text-sm mb-8">
        Ligue e desligue módulos conforme seu negócio cresce. O Core (autenticação e configurações) está sempre
        ativo.
      </p>

      {error ? (
        <ErrorBanner
          message={error.message}
          actionHref={error.code === "MUST_CHANGE_PASSWORD" ? "/dashboard/conta" : undefined}
          actionLabel={error.code === "MUST_CHANGE_PASSWORD" ? "Ir para Minha conta" : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map(({ module, enabled }) => (
            <ModuleToggle
              key={module}
              module={module}
              name={MODULE_LABELS[module]?.name ?? module}
              description={MODULE_LABELS[module]?.description ?? ""}
              initialEnabled={enabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}
