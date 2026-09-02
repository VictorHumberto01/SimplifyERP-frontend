"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justChangedPassword = searchParams.get("senhaAlterada") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.message ?? "Não foi possível entrar.");
      setLoading(false);
      return;
    }

    if (data?.mfaRequired) {
      setError(data.message ?? "Este login requer verificação MFA, ainda não suportada nesta interface.");
      setLoading(false);
      return;
    }

    router.push(data?.account?.mustChangePassword ? "/dashboard/conta" : "/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 text-paper px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-sans font-bold text-xl text-paper">Simplify</span>
            <span className="font-display italic font-medium text-xl text-amber-400">ERP</span>
          </Link>
          <h1 className="font-display text-3xl mb-2">Entrar</h1>
          <p className="text-stone-400 text-sm">Acesse o painel do seu negócio.</p>
        </div>

        {justChangedPassword && (
          <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-emerald-300">Senha alterada com sucesso. Entre novamente com a nova senha.</p>
          </div>
        )}

        <div className="rounded-2xl p-6 sm:p-8 bg-stone-900/90 border border-white/10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@seunegocio.com.br"
                className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-700 hover:from-amber-500 hover:to-emerald-600 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          Acesso disponível apenas para clientes já cadastrados. Fale com a gente na{" "}
          <Link href="/#comecar" className="text-amber-400 font-semibold hover:text-amber-300">
            página inicial
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
