import { cookies } from "next/headers";
import { apiFetch, ApiError } from "@/lib/api";
import { ErrorBanner } from "@/components/error-banner";
import { ChangePasswordForm } from "./change-password-form";
import { MfaSetup } from "./mfa-setup";
import { SessionsList } from "./sessions-list";

const SESSION_COOKIE = "simplifyerp_session";

interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  mustChangePassword: boolean;
  mfaEnabled: boolean;
}

interface Session {
  id: string;
  userAgent: string | null;
  ip: string | null;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

export default async function ContaPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  let account: Account | null = null;
  let accountError: string | null = null;

  if (token) {
    try {
      ({ account } = await apiFetch<{ account: Account }>("/v1/auth/me", { token }));
    } catch (err) {
      accountError = err instanceof ApiError ? err.message : "Não foi possível carregar sua conta.";
    }
  }

  let sessions: Session[] = [];
  let sessionsError: string | null = null;

  if (token) {
    try {
      sessions = await apiFetch<Session[]>("/v1/auth/sessions", { token });
    } catch (err) {
      sessionsError = err instanceof ApiError ? err.message : "Não foi possível carregar as sessões.";
    }
  }

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="font-display text-3xl mb-2">Minha conta</h1>
        {account && <p className="text-stone-400 text-sm">{account.name} · {account.email}</p>}
      </div>

      {account?.mustChangePassword && (
        <ErrorBanner message="Você precisa trocar sua senha antes de continuar usando o sistema." />
      )}

      {accountError && <ErrorBanner message={accountError} />}

      <section>
        <h2 className="font-display text-xl mb-1">Senha</h2>
        <p className="text-stone-400 text-sm mb-4">
          Trocar a senha encerra todas as suas sessões ativas — você precisará entrar de novo.
        </p>
        <ChangePasswordForm required={account?.mustChangePassword ?? false} />
      </section>

      <section>
        <h2 className="font-display text-xl mb-1">Autenticação de dois fatores</h2>
        <p className="text-stone-400 text-sm mb-4">
          Adiciona uma camada extra de segurança pedindo um código do seu app autenticador a cada login.
        </p>
        <MfaSetup enabled={account?.mfaEnabled ?? false} email={account?.email ?? ""} />
      </section>

      <section>
        <h2 className="font-display text-xl mb-1">Sessões ativas</h2>
        <p className="text-stone-400 text-sm mb-4">Dispositivos onde sua conta está logada no momento.</p>
        {sessionsError ? (
          <ErrorBanner message={sessionsError} />
        ) : (
          <SessionsList sessions={sessions} />
        )}
      </section>
    </div>
  );
}
