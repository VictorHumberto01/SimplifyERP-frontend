"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap } from "lucide-react";

interface ModuleData {
  id: string;
  title: string;
  badge: string;
  price: number;
  description: string;
  features: string[];
  isBase?: boolean;
}

const MODULES: ModuleData[] = [
  {
    id: "core",
    title: "Plataforma Base & Gestão de Equipe",
    badge: "Essencial",
    price: 49,
    isBase: true,
    description: "Controle de operadores, permissões por função (caixa, gerente, garçom) e configuração da loja.",
    features: [
      "Multi-usuários com controle de permissões",
      "Segurança e proteção de dados em nuvem",
      "Acesso em qualquer dispositivo (celular, tablet, PC)",
      "Backups automáticos diários",
    ],
  },
  {
    id: "pdv",
    title: "Frente de Caixa (PDV Ágil)",
    badge: "Mais Popular",
    price: 39,
    description: "Vendas rápidas no balcão, abertura/fechamento de caixa, sangrias e impressão térmica.",
    features: [
      "Lançamento de produtos em 1 clique",
      "Suporte a impressoras e leitores de código de barras",
      "Controle de sangrias e suprimentos de caixa",
      "Modo contingência com sincronização",
    ],
  },
  {
    id: "qr",
    title: "Cardápio Digital por QR Code",
    badge: "Mais Popular",
    price: 39,
    description: "Atendimento self-service nas mesas via celular, sem pagar taxas por pedido.",
    features: [
      "QR Codes individuais para cada mesa ou balcão",
      "Cardápio com fotos e adicionais customizáveis",
      "Zero porcentagem cobrada sobre as vendas",
      "Geração de PIX dinâmico na comanda",
    ],
  },
  {
    id: "stock",
    title: "Controle de Estoque & Ficha Técnica",
    badge: "Expansão",
    price: 39,
    description: "Baixa automática de ingredientes por prato vendido e alertas de reposição de insumos.",
    features: [
      "Ficha técnica detalhada por receita",
      "Alertas automáticos de estoque mínimo",
      "Relatório de perdas e desperdício",
      "Sugestão inteligente de compras",
    ],
  },
  {
    id: "finance",
    title: "Gestão Financeira & Demonstrativo (DRE)",
    badge: "Expansão",
    price: 39,
    description: "Contas a pagar/receber, conciliação de maquininhas de cartão e visão exata do lucro líquido.",
    features: [
      "Fluxo de caixa diário e projetado",
      "Controle de contas a pagar e receber",
      "Conciliação de taxas de cartões e PIX",
      "DRE simplificado para tomada de decisão",
    ],
  },
  {
    id: "fiscal",
    title: "Emissão Fiscal Automática (NFC-e / NF-e)",
    badge: "Expansão",
    price: 49,
    description: "Emissão de notas fiscais ao consumidor integrada ao fechamento de cada venda sem burocracia.",
    features: [
      "Emissão automática de NFC-e na venda",
      "Armazenamento seguro de XMLs",
      "Envio mensal automático para a contabilidade",
      "Compatível com todos os estados",
    ],
  },
];

export function ModernModules() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["core", "pdv", "qr"]);

  const toggle = (id: string, isBase?: boolean) => {
    if (isBase) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const total = MODULES.reduce((acc, curr) => {
    return selectedIds.includes(curr.id) ? acc + curr.price : acc;
  }, 0);

  return (
    <section id="modulos" className="w-full bg-stone-950 py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" />
              Crescimento Sob Demanda
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Pague apenas pelo que o seu negócio usa
            </h2>
          </div>
          <p className="text-stone-300 text-sm sm:text-base max-w-md">
            Ligue e desligue módulos a qualquer momento conforme o seu estabelecimento cresce. Sem pacotes fechados ou cobranças surpresa.
          </p>
        </div>

        {/* Modules Grid + Live Calculated Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Module Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULES.map((m) => {
              const active = selectedIds.includes(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => toggle(m.id, m.isBase)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between select-none ${
                    active
                      ? "bg-stone-900/90 border-2 border-amber-500/80 shadow-xl shadow-amber-500/10 scale-[1.01]"
                      : "bg-white/[0.02] border border-white/5 opacity-50 hover:opacity-90 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-stone-300 border border-white/10">
                        {m.badge}
                      </span>
                      {m.isBase ? (
                        <span className="text-xs font-semibold text-amber-400">Incluso na Base</span>
                      ) : (
                        <span className={`text-xs font-semibold ${active ? "text-emerald-400" : "text-stone-500"}`}>
                          {active ? "Ativado" : "Desativado"}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-xs text-stone-300 leading-relaxed mb-4">{m.description}</p>

                    <ul className="space-y-1.5 border-t border-white/10 pt-3 mb-4">
                      {m.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-xs text-stone-400 font-medium">Mensalidade</span>
                    <div className="text-right">
                      <span className="text-lg font-black text-white">R$ {m.price.toFixed(2)}</span>
                      <span className="text-[10px] text-stone-400"> /mês</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Live Plan Summary Card */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-white/15 p-6 backdrop-blur-2xl shadow-2xl sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-sm font-bold text-white">Configuração Selecionada</span>
              <span className="text-xs font-semibold text-emerald-400">14 Dias Grátis</span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-300 border-b border-white/10 pb-4">
              {MODULES.filter((m) => selectedIds.includes(m.id)).map((m) => (
                <div key={m.id} className="flex items-center justify-between">
                  <span className="truncate pr-2">✓ {m.title}</span>
                  <span className="font-semibold text-white">R$ {m.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>Taxa de Instalação:</span>
                <span className="text-emerald-400 font-semibold">R$ 0,00 (Gratuito)</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa por Venda / Comissão:</span>
                <span className="text-emerald-400 font-semibold">Zero</span>
              </div>
              <div className="flex justify-between">
                <span>Contrato ou Fidelidade:</span>
                <span className="text-stone-200 font-semibold">Sem Fidelidade</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
              <div>
                <div className="text-sm font-bold text-white">Total Previsto</div>
                <div className="text-[11px] text-stone-400">faturado mensalmente</div>
              </div>
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">
                R$ {total.toFixed(2)}
              </div>
            </div>

            <a
              href="#comecar"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-700 hover:from-amber-500 hover:to-emerald-600 text-white font-semibold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Falar sobre este plano</span>
              <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="text-center text-[11px] text-stone-400">
              Nossa equipe configura o ambiente pra você.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
