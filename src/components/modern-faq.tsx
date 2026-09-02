"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Como funciona o teste gratuito de 14 dias?",
    a: "Você tem acesso total a todos os módulos do SimplifyERP por 14 dias, sem precisar cadastrar cartão de crédito. Se gostar, escolhe os módulos que deseja continuar usando.",
  },
  {
    q: "Preciso pagar taxa de implantação ou contratar consultoria?",
    a: "Não! A taxa de implantação é R$ 0,00. O sistema é intuitivo e você mesmo cadastra seus produtos e mesas em poucos minutos com nosso passo a passo guiado.",
  },
  {
    q: "O Cardápio Digital por QR Code cobra comissão sobre as minhas vendas?",
    a: "Zero comissão. Diferente de aplicativos de entrega tradicionais que cobram até 15% por pedido, no SimplifyERP você paga apenas a mensalidade fixa do módulo, ficando com 100% do seu faturamento.",
  },
  {
    q: "Posso começar apenas com a Frente de Caixa e adicionar Estoque ou Financeiro depois?",
    a: "Sim! Nossa plataforma foi feita sob o conceito de crescimento sob demanda. Você ativa ou desativa módulos na hora com um clique, pagando somente pelo que sua operação precisa.",
  },
  {
    q: "Preciso comprar computadores caros para usar o sistema?",
    a: "Não. O SimplifyERP roda diretamente no navegador em qualquer computador, notebook, tablet ou celular com internet. É compatível com impressoras térmicas e leitores de código de barras padrão de mercado.",
  },
  {
    q: "O que acontece se meu computador quebrar? Meus dados estão seguros?",
    a: "Seus dados estão 100% seguros em nuvem com backups diários automáticos. Se o computador quebrar, basta abrir o navegador em outro dispositivo, fazer login e continuar sua operação normalmente.",
  },
];

export function ModernFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-stone-950 py-24 border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Dúvidas Comuns
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-stone-300 text-base">
            Tudo o que você precisa saber sobre o funcionamento do SimplifyERP.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-white hover:bg-white/[0.03] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-stone-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
