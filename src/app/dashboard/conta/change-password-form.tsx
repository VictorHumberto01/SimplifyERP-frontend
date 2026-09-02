"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export function ChangePasswordForm({ required }: { required: boolean }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.message ?? "Não foi possível trocar a senha.");
      setLoading(false);
      return;
    }

    router.push("/login?senhaAlterada=1");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-6 bg-stone-900/90 border border-white/10">
      {required && (
        <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
          Troca de senha obrigatória
        </p>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
          Senha atual
        </label>
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
          Nova senha
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres, 1 maiúscula e 1 número"
          className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-700 hover:from-amber-500 hover:to-emerald-600 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Trocando senha...</span>
          </>
        ) : (
          <>
            <span>Trocar senha</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
