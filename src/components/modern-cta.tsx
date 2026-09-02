"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export function ModernCta() {
  const [storeName, setStoreName] = useState("");
  const [segment, setSegment] = useState("Restaurante / Bar");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <section id="comecar" className="w-full bg-stone-900 py-24 border-b border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-amber-600/15 via-emerald-700/15 to-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-stone-950/90 to-stone-900/90 border border-white/15 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Pitch */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Atendimento consultivo
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Comece a transformar a gestão do seu negócio hoje.
              </h2>

              <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                Deixe seus dados que nossa equipe entra em contato, entende seu negócio e configura o ambiente pra você — cardápio, PDV e financeiro prontos sem você mexer em nada.
              </p>

              <div className="space-y-3 pt-2 text-sm text-stone-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Sem taxa de implantação</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Configuração guiada e suporte prioritário</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Importação fácil de produtos e cardápio</span>
                </div>
              </div>
            </div>

            {/* Right Signup Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl p-6 sm:p-8 bg-stone-900/90 border border-white/10 shadow-xl">
                {success ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Recebemos seu contato!
                    </h3>
                    <p className="text-sm text-stone-300 max-w-sm mx-auto">
                      Nossa equipe vai entrar em contato em <strong className="text-white">{email}</strong> pra configurar o ambiente do seu negócio.
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setStoreName("");
                        setEmail("");
                        setPhone("");
                      }}
                      className="mt-4 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
                    >
                      Enviar outro contato
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Nome do seu Estabelecimento / Loja
                      </label>
                      <input
                        type="text"
                        required
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Ex: Restaurante Sabor Real ou Boutique Central"
                        className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                          Segmento
                        </label>
                        <select
                          value={segment}
                          onChange={(e) => setSegment(e.target.value)}
                          className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                          <option value="Restaurante / Bar">Restaurante / Bar</option>
                          <option value="Cafeteria / Doceria">Cafeteria / Doceria</option>
                          <option value="Loja / Varejo">Loja / Varejo</option>
                          <option value="Mercado / Empório">Mercado / Empório</option>
                          <option value="Outro Segmento">Outro Segmento</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                          WhatsApp / Contato
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        E-mail Comercial
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contato@seunegocio.com.br"
                        className="w-full rounded-xl bg-stone-950 border border-white/10 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-700 hover:from-amber-500 hover:to-emerald-600 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Falar com nosso time</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
