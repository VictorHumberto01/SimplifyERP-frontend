"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

interface MfaSetupProps {
  enabled: boolean;
  email: string;
}

export function MfaSetup({ enabled: initialEnabled, email }: MfaSetupProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [starting, setStarting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function handleStart() {
    setStarting(true);
    setError(null);

    const response = await fetch("/api/auth/mfa/setup", { method: "POST" });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.message ?? "Não foi possível iniciar a configuração do MFA.");
      setStarting(false);
      return;
    }

    const otpauthUrl: string = data.otpauthUrl;
    const secretParam = new URL(otpauthUrl.replace("otpauth://", "https://")).searchParams.get("secret");
    setSecret(secretParam);
    setQrDataUrl(await QRCode.toDataURL(otpauthUrl));
    setStarting(false);
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setConfirming(true);
    setError(null);

    const response = await fetch("/api/auth/mfa/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.message ?? "Código inválido.");
      setConfirming(false);
      return;
    }

    setConfirmed(true);
    setEnabled(true);
    setConfirming(false);
  }

  if (enabled) {
    return (
      <div className="rounded-2xl p-6 bg-stone-900/90 border border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-paper">MFA ativado</p>
          <p className="text-xs text-stone-400">
            {confirmed
              ? "Configuração concluída. Use seu app autenticador no próximo login."
              : "Sua conta está protegida com autenticação de dois fatores."}
          </p>
        </div>
      </div>
    );
  }

  if (!qrDataUrl) {
    return (
      <div className="rounded-2xl p-6 bg-stone-900/90 border border-white/10 space-y-4">
        <button
          onClick={handleStart}
          disabled={starting}
          className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-paper text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {starting && <Loader2 className="w-4 h-4 animate-spin" />}
          Ativar autenticação de dois fatores
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 bg-stone-900/90 border border-white/10 space-y-4">
      <p className="text-sm text-stone-300">
        Escaneie o QR Code abaixo no Google Authenticator, Authy ou similar ({email}):
      </p>

      <div className="bg-paper p-4 rounded-xl w-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="QR Code para configurar MFA" width={200} height={200} />
      </div>

      {secret && (
        <p className="text-xs text-stone-400">
          Não consegue escanear? Digite manualmente:{" "}
          <code className="text-paper font-mono break-all">{secret}</code>
        </p>
      )}

      <form onSubmit={handleConfirm} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
            Código de 6 dígitos
          </label>
          <input
            type="text"
            inputMode="numeric"
            required
            minLength={6}
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            className="w-40 rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors font-mono tracking-widest"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={confirming}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-700 hover:from-amber-500 hover:to-emerald-600 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          {confirming ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Confirmar e ativar
        </button>
      </form>
    </div>
  );
}
