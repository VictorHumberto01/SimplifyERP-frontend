"use client";

import { useState, useEffect } from "react";
import { ThreeCanvas } from "./three-canvas";
import { ArrowRight, ArrowUpRight, TrendingUp, QrCode, ShieldCheck } from "lucide-react";

export function ModernHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 bg-stone-950 text-paper">
      <ThreeCanvas />

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-8">
              — Zero fricção, sem taxa de adesão
            </p>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
              Sua loja roda
              <br />
              <span className="italic font-medium text-amber-400">num só lugar,</span>
              <br />
              sem inventar moda.
            </h1>

            <p className="text-lg sm:text-xl text-stone-400 leading-relaxed max-w-xl mb-10">
              Caderno de estoque, app de vendas e planilha financeira, fora. O{" "}
              <strong className="text-paper font-semibold">SimplifyERP</strong> junta PDV,
              Cardápio Digital por QR Code e Financeiro num só painel — e você só liga o que
              usa.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-6 mb-14">
              <a
                href="#comecar"
                className="group flex items-center gap-3 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-colors"
              >
                Fale com a gente
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#demonstracao"
                className="group flex items-center gap-2 py-4 text-paper font-semibold border-b-2 border-transparent hover:border-amber-400 transition-colors"
              >
                Ver o simulador ao vivo
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-500 font-mono">
              <span>Onboarding &lt; 30 min</span>
              <span className="text-amber-500">·</span>
              <span>Sem taxa de implantação</span>
              <span className="text-amber-500">·</span>
              <span>Cancele quando quiser</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-sm transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
              }}
            >
              <div className="bg-paper text-stone-900 p-6 shadow-[10px_10px_0_0_rgba(242,169,59,0.9)] border-t-4 border-dashed border-stone-300">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
                  <div>
                    <div className="font-display font-semibold text-lg leading-tight">
                      Bistrô &amp; Café Central
                    </div>
                    <div className="text-xs text-emerald-700 font-mono flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Caixa aberto
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 border border-stone-300 text-stone-500">
                    AO VIVO
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
                  <div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3" /> Vendas hoje
                    </div>
                    <div className="text-2xl font-bold">R$ 3.840</div>
                    <div className="text-[11px] text-emerald-700">+22% vs. ontem</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1 mb-1">
                      <QrCode className="w-3 h-3" /> Mesas ativas
                    </div>
                    <div className="text-2xl font-bold">28</div>
                    <div className="text-[11px] text-stone-500">4 min de espera</div>
                  </div>
                </div>

                <div className="border-t border-dashed border-stone-300 pt-4 flex items-center justify-between text-xs font-mono text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Estoque baixado automaticamente
                  </span>
                </div>
              </div>

              <div
                className="absolute -bottom-5 -left-5 px-4 py-3 bg-stone-950 border border-amber-400/30 hidden sm:block"
                style={{ transform: `translate3d(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px, 0)` }}
              >
                <div className="text-xs font-bold text-paper">Pronto em 30 min</div>
                <div className="text-[11px] text-stone-500 font-mono">Setup self-service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
