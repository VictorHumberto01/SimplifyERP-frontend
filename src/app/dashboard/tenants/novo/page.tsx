"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface CreatedTenant {
  account: { name: string; email: string };
  tenant: { name: string };
  establishment: { name: string };
  tokens: { accessToken: string };
}

export default function NovoTenantPage() {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [establishmentName, setEstablishmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedTenant | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/tenants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerName, email, password, establishmentName }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.message ?? "Não foi possível criar o tenant.");
      setLoading(false);
      return;
    }

    setCreated(data);
    setLoading(false);
  }

  function reset() {
    setCreated(null);
    setOwnerName("");
    setEmail("");
    setPassword("");
    setEstablishmentName("");
  }

  return (
    <div className="max-w-lg">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-paper mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar ao painel
      </Link>

      <h1 className="font-display text-3xl mb-2">Novo tenant</h1>
      <p className="text-stone-400 text-sm mb-8">
        Cadastre um novo cliente (tenant + dono). Só super admins podem criar contas — não há cadastro público.
      </p>

      <div className="rounded-2xl p-6 sm:p-8 bg-stone-900/90 border border-white/10 shadow-xl">
        {created ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-display text-xl">Tenant criado com sucesso</h2>
            </div>

            <p className="text-sm text-stone-400">
              Repasse as credenciais abaixo para o cliente. O token de acesso inicial já foi emitido e expira em
              alguns minutos — o cliente deve trocar a senha no primeiro login.
            </p>

            <dl className="text-sm space-y-2 font-mono bg-stone-950 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Estabelecimento</dt>
                <dd className="text-paper">{created.establishment.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Dono</dt>
                <dd className="text-paper">{created.account.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">E-mail</dt>
                <dd className="text-paper">{created.account.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Senha</dt>
                <dd className="text-paper">{password}</dd>
              </div>
              <div className="pt-2 border-t border-white/10">
                <dt className="text-stone-500 mb-1">Token de acesso inicial</dt>
                <dd className="text-paper break-all text-xs">{created.tokens.accessToken}</dd>
              </div>
            </dl>

            <button
              onClick={reset}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-paper text-sm font-semibold transition-colors"
            >
              Cadastrar outro tenant
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Nome do dono
              </label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Maria Silva"
                className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Nome do estabelecimento
              </label>
              <input
                type="text"
                required
                value={establishmentName}
                onChange={(e) => setEstablishmentName(e.target.value)}
                placeholder="Bistrô da Maria"
                className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                E-mail do dono
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dono@negocio.com.br"
                className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Senha inicial
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
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
                  <span>Criando tenant...</span>
                </>
              ) : (
                <>
                  <span>Criar tenant</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
