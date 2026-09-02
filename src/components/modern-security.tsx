"use client";

import { ShieldCheck, Lock, KeyRound, Cloud, Users, History } from "lucide-react";

export function ModernSecurity() {
  const PILLARS = [
    {
      icon: ShieldCheck,
      title: "Proteção e Criptografia de Dados",
      desc: "Todas as suas informações comerciais, financeiras e cadastros de clientes são protegidos com criptografia de ponta a ponta.",
    },
    {
      icon: KeyRound,
      title: "Autenticação em Duas Etapas (MFA)",
      desc: "Proteja o acesso do dono e da gerência com confirmação de segurança direto no aplicativo de autenticação.",
    },
    {
      icon: Users,
      title: "Permissões Granulares por Cargo",
      desc: "Defina com precisão o que caixas, garçons e gerentes podem visualizar e editar, bloqueando dados confidenciais.",
    },
    {
      icon: Cloud,
      title: "Nuvem com Backups Automáticos",
      desc: "Nunca se preocupe em perder dados caso um computador quebre. Tudo fica salvo e sincronizado em nuvem com backups diários.",
    },
    {
      icon: History,
      title: "Histórico Completo de Ações",
      desc: "Saiba exatamente quem abriu o caixa, quem aplicou descontos e quando cada produto foi vendido ou cancelado.",
    },
    {
      icon: Lock,
      title: "Confiabilidade & Estabilidade",
      desc: "Plataforma desenhada para não travar nos momentos de maior movimento da sua loja ou restaurante.",
    },
  ];

  return (
    <section id="seguranca" className="w-full bg-stone-950 py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Segurança &amp; Confiabilidade
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            A tranquilidade que a sua empresa merece
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Seus dados financeiros e operacionais protegidos com os mais altos padrões de segurança corporativa.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-7 bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-stone-300 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
