"use client";

import { Check, X, TrendingUp } from "lucide-react";

export function ModernComparison() {
  const COMPARISONS = [
    {
      feature: "Tempo para começar a operar",
      legacy: "De 2 a 4 semanas com visitas presenciais e manuais pesados",
      simplify: "Menos de 30 minutos (cadastre o cardápio e comece a vender)",
    },
    {
      feature: "Taxa de adesão e instalação",
      legacy: "Cobram entre R$ 1.500,00 e R$ 4.000,00 de implantação",
      simplify: "R$ 0,00 (Totalmente gratuito para iniciar)",
    },
    {
      feature: "Cardápio QR Code nas mesas",
      legacy: "Cobram porcentagem de 10% a 15% sobre cada comanda",
      simplify: "100% livre de comissão por venda",
    },
    {
      feature: "Flexibilidade de módulos",
      legacy: "Pacotes fechados: você paga por ferramentas que nunca usa",
      simplify: "Crescimento sob demanda: ative só o que precisa",
    },
    {
      feature: "Contrato e fidelidade",
      legacy: "Contratos de 12 a 24 meses com multas rescisórias",
      simplify: "Zero fidelidade. Cancele a qualquer momento",
    },
    {
      feature: "Suporte e facilidade de uso",
      legacy: "Telas complexas e suporte lento via chamados demorados",
      simplify: "Interface intuitiva e suporte humanizado direto",
    },
  ];

  return (
    <section id="comparativo" className="w-full bg-stone-900 py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Vantagens Claras
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Por que trocar sistemas engessados pelo SimplifyERP?
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Veja a comparação direta entre os sistemas legados tradicionais e a nossa proposta moderna.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl bg-stone-950/80 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 font-bold text-stone-300 w-1/3">O que você avalia</th>
                  <th className="p-5 font-bold text-red-400/90 w-1/3 border-l border-white/10">Sistemas Tradicionais</th>
                  <th className="p-5 font-extrabold text-white bg-amber-600/10 w-1/3 border-l border-amber-500/30">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">
                      SimplifyERP
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="p-5 text-stone-400 border-l border-white/10">
                      <div className="flex items-start gap-2.5">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="p-5 text-stone-100 font-medium bg-amber-600/[0.04] border-l border-amber-500/20">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">{row.simplify}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
