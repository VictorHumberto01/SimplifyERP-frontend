"use client";

import { Utensils, ShoppingBag, Coffee, Sparkles, Store, Check } from "lucide-react";

export function ModernSolutions() {
  const SOLUTIONS = [
    {
      icon: Utensils,
      title: "Restaurantes & Bares",
      tagline: "Agilidade do pedido à cozinha",
      desc: "Cardápio QR nas mesas, comandas automáticas, controle de pedidos sem fila e divisão de contas na hora do pagamento.",
      highlight: "Até 3x mais giro de mesas",
    },
    {
      icon: ShoppingBag,
      title: "Lojas & Varejo",
      tagline: "Frente de caixa rápida e estoque em dia",
      desc: "Lançamento por código de barras, controle de grade (tamanhos/cores), baixa de estoque instantânea e emissão de cupom fiscal.",
      highlight: "Venda rápida em poucos cliques",
    },
    {
      icon: Coffee,
      title: "Cafés & Confeitarias",
      tagline: "Atendimento expresso de balcão",
      desc: "Controle de combos, receitas e adicionais, fechamento via PIX instantâneo e gestão de suprimentos e sangrias de caixa.",
      highlight: "Zero filas no horário de pico",
    },
    {
      icon: Store,
      title: "Mercados & Franquias",
      tagline: "Controle financeiro e previsibilidade",
      desc: "Curva ABC para compras inteligentes, controle de validade e contas a pagar/receber com conciliação automática de taxas.",
      highlight: "Visão 360° do lucro real",
    },
  ];

  return (
    <section id="solucoes" className="w-full bg-stone-950 py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Desenvolvido Para a Sua Rotina
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Soluções sob medida para o seu segmento
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Seja um restaurante movimentado ou uma loja de roupas, o SimplifyERP se adapta exatamente à sua forma de atender.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-6 bg-stone-900/60 border border-white/10 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600/20 to-emerald-400/20 border border-amber-400/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{sol.title}</h3>
                  <div className="text-xs font-semibold text-emerald-300 mb-3">{sol.tagline}</div>
                  <p className="text-xs text-stone-300 leading-relaxed mb-6">{sol.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    {sol.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
