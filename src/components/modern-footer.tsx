"use client";

import { Store, Heart } from "lucide-react";

export function ModernFooter() {
  return (
    <footer className="w-full bg-stone-950 text-stone-400 text-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-stone-950 rounded-[11px] flex items-center justify-center">
                  <Store className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Simplify<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">ERP</span>
              </span>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Tecnologia ágil, integrada e acessível para impulsionar lojas, restaurantes, cafeterias e pequenos negócios em todo o Brasil.
            </p>

            <div className="text-xs text-stone-500">
              © {new Date().getFullYear()} SimplifyERP. Todos os direitos reservados.
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Soluções
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#solucoes" className="hover:text-white transition-colors">Para Restaurantes e Bares</a></li>
              <li><a href="#solucoes" className="hover:text-white transition-colors">Para Lojas e Varejo</a></li>
              <li><a href="#solucoes" className="hover:text-white transition-colors">Para Cafés e Franquias</a></li>
              <li><a href="#solucoes" className="hover:text-white transition-colors">Para Mercados e Empórios</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Recursos
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#demonstracao" className="hover:text-white transition-colors">Frente de Caixa (PDV)</a></li>
              <li><a href="#demonstracao" className="hover:text-white transition-colors">Cardápio QR Code</a></li>
              <li><a href="#demonstracao" className="hover:text-white transition-colors">Controle de Estoque</a></li>
              <li><a href="#demonstracao" className="hover:text-white transition-colors">Gestão Financeira</a></li>
              <li><a href="#modulos" className="hover:text-white transition-colors">Emissão Fiscal NFC-e</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Institucional
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#modulos" className="hover:text-white transition-colors">Planos &amp; Preços</a></li>
              <li><a href="#seguranca" className="hover:text-white transition-colors">Segurança &amp; Privacidade</a></li>
              <li><a href="#comecar" className="hover:text-white transition-colors">Falar com Consultor</a></li>
              <li><a href="#comecar" className="hover:text-white transition-colors">Central de Ajuda</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            Desenvolvido para máxima velocidade e simplicidade operacional.
          </div>
          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para quem empreende</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
