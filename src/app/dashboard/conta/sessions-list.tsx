"use client";

import { useState } from "react";
import { Loader2, Monitor, X } from "lucide-react";

interface Session {
  id: string;
  userAgent: string | null;
  ip: string | null;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

export function SessionsList({ sessions: initialSessions }: { sessions: Session[] }) {
  const [sessions, setSessions] = useState(initialSessions);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRevoke(sessionId: string) {
    setRevokingId(sessionId);
    setError(null);

    const response = await fetch(`/api/auth/sessions/${sessionId}`, { method: "DELETE" });

    if (response.ok) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } else {
      const data = await response.json().catch(() => null);
      setError(data?.message ?? "Não foi possível encerrar a sessão.");
    }
    setRevokingId(null);
  }

  if (sessions.length === 0) {
    return <p className="text-sm text-stone-500">Nenhuma sessão ativa encontrada.</p>;
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-red-400">{error}</p>}
      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-xl p-4 bg-stone-900/90 border border-white/10 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Monitor className="w-4 h-4 text-stone-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-paper truncate">{session.userAgent ?? "Dispositivo desconhecido"}</p>
              <p className="text-xs text-stone-500">
                {session.ip ?? "IP desconhecido"} · último uso{" "}
                {new Date(session.lastUsedAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleRevoke(session.id)}
            disabled={revokingId === session.id}
            className="shrink-0 p-2 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            title="Encerrar sessão"
          >
            {revokingId === session.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
          </button>
        </div>
      ))}
    </div>
  );
}
