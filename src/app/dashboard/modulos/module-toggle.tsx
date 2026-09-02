"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

interface ModuleToggleProps {
  module: string;
  name: string;
  description: string;
  initialEnabled: boolean;
}

export function ModuleToggle({ module, name, description, initialEnabled }: ModuleToggleProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    setLoading(true);
    setError(null);
    const next = !enabled;

    const response = await fetch(`/api/establishment/modules/${module}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: next }),
    });

    if (response.ok) {
      setEnabled(next);
    } else {
      const data = await response.json().catch(() => null);
      setError(data?.message ?? "Não foi possível atualizar o módulo.");
    }
    setLoading(false);
  }

  return (
    <div
      className={`text-left rounded-2xl p-5 transition-all ${
        enabled
          ? "bg-stone-900/90 border-2 border-amber-500/80 shadow-xl shadow-amber-500/10 scale-[1.01]"
          : "bg-white/[0.02] border border-white/5 opacity-50 hover:opacity-90 hover:border-white/20"
      }`}
    >
      <button onClick={handleToggle} disabled={loading} className="w-full text-left disabled:opacity-70">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-paper">{name}</h3>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
          ) : (
            enabled && <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
        </div>
        <p className="text-xs text-stone-400 mb-3">{description}</p>
        <span className={`text-xs font-semibold ${enabled ? "text-emerald-400" : "text-stone-500"}`}>
          {enabled ? "Ativado" : "Desativado"}
        </span>
      </button>

      {error && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-start gap-2 text-xs text-red-400">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
