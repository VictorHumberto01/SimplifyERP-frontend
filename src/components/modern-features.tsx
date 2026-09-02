"use client";

import { useState } from "react";
import { 
  ShoppingCart, 
  QrCode, 
  Package, 
  LineChart, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Send, 
  Receipt, 
  Smartphone 
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

const SAMPLE_ITEMS: MenuItem[] = [
  { id: "1", name: "Hambúrguer Artesanal Prime", category: "Lanches", price: 36.0 },
  { id: "2", name: "Batata Rústica com Alecrim", category: "Porções", price: 24.0 },
  { id: "3", name: "Suco Natural de Laranja 500ml", category: "Bebidas", price: 10.0 },
  { id: "4", name: "Sobremesa Brownie com Sorvete", category: "Sobremesas", price: 19.0 },
];

export function ModernFeatures() {
  const [activeTab, setActiveTab] = useState<"pdv" | "qr" | "stock" | "finance">("pdv");

  // PDV State
  const [pdvCart, setPdvCart] = useState<{ item: MenuItem; qty: number }[]>([
    { item: SAMPLE_ITEMS[0], qty: 1 },
    { item: SAMPLE_ITEMS[2], qty: 2 },
  ]);
  const [paymentDone, setPaymentDone] = useState(false);

  // QR Menu State
  const [tableNumber] = useState("05");
  const [qrItems, setQrItems] = useState<{ item: MenuItem; qty: number }[]>([
    { item: SAMPLE_ITEMS[0], qty: 1 },
  ]);
  const [qrSent, setQrSent] = useState(false);

  const totalPdv = pdvCart.reduce((sum, i) => sum + i.item.price * i.qty, 0);
  const totalQr = qrItems.reduce((sum, i) => sum + i.item.price * i.qty, 0);

  const addItemToPdv = (item: MenuItem) => {
    setPaymentDone(false);
    setPdvCart((prev) => {
      const exists = prev.find((i) => i.item.id === item.id);
      if (exists) {
        return prev.map((i) => (i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removePdvItem = (id: string) => {
    setPaymentDone(false);
    setPdvCart((prev) => prev.filter((i) => i.item.id !== id));
  };

  return (
    <section id="demonstracao" className="w-full bg-stone-900 py-24 border-t border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Experiência Prática &amp; Intuitiva
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Tudo o que você precisa para gerenciar e crescer
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Experimente no simulador abaixo como o SimplifyERP agiliza sua rotina no balcão, nas mesas e no financeiro.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="p-1.5 rounded-2xl bg-stone-950/80 border border-white/10 backdrop-blur-xl flex items-center gap-2">
            
            <button
              onClick={() => setActiveTab("pdv")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "pdv"
                  ? "bg-gradient-to-r from-amber-600 to-emerald-700 text-white shadow-lg shadow-amber-500/25"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Frente de Caixa (PDV)</span>
            </button>

            <button
              onClick={() => setActiveTab("qr")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "qr"
                  ? "bg-gradient-to-r from-amber-600 to-emerald-700 text-white shadow-lg shadow-amber-500/25"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Cardápio QR Code</span>
            </button>

            <button
              onClick={() => setActiveTab("stock")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "stock"
                  ? "bg-gradient-to-r from-amber-600 to-emerald-700 text-white shadow-lg shadow-amber-500/25"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Estoque &amp; Insumos</span>
            </button>

            <button
              onClick={() => setActiveTab("finance")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "finance"
                  ? "bg-gradient-to-r from-amber-600 to-emerald-700 text-white shadow-lg shadow-amber-500/25"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Finanças &amp; Lucratividade</span>
            </button>

          </div>
        </div>

        {/* Dynamic Interactive Window */}
        <div className="rounded-3xl bg-stone-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl p-6 sm:p-8">
          
          {/* TAB 1: PDV FRENTE DE CAIXA */}
          {activeTab === "pdv" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product Catalog Picker */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white">Catálogo de Venda Expressa</h3>
                    <p className="text-xs text-stone-400">Clique nos produtos para adicionar à comanda de balcão.</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    PDV Online
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addItemToPdv(item)}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-amber-500/40 text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{item.name}</div>
                        <div className="text-base font-extrabold text-emerald-400 mt-1">
                          R$ {item.price.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Compatível com leitores de código de barras, balanças e impressoras térmicas de 58/80mm.</span>
                </div>
              </div>

              {/* PDV Active Ticket Box */}
              <div className="lg:col-span-5 rounded-2xl bg-stone-900/90 border border-white/10 p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <span className="font-bold text-sm text-white">Comanda Atual #0812</span>
                    <button
                      onClick={() => setPdvCart([])}
                      className="text-xs text-stone-400 hover:text-red-400 transition-colors"
                    >
                      Limpar Itens
                    </button>
                  </div>

                  {/* Items in ticket */}
                  <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                    {pdvCart.length === 0 ? (
                      <div className="py-10 text-center text-stone-500 text-xs">
                        Nenhum item selecionado. Clique nos produtos para lançar.
                      </div>
                    ) : (
                      pdvCart.map((i) => (
                        <div
                          key={i.item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-white">{i.item.name}</div>
                            <div className="text-stone-400">
                              {i.qty}x R$ {i.item.price.toFixed(2)} = <span className="text-emerald-300 font-bold">R$ {(i.qty * i.item.price).toFixed(2)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removePdvItem(i.item.id)}
                            className="text-stone-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Ticket Total and Action */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-stone-400 text-xs uppercase font-medium">Total do Pedido</span>
                    <span className="text-2xl font-black text-white">
                      R$ {totalPdv.toFixed(2)}
                    </span>
                  </div>

                  {paymentDone ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Venda Finalizada! Comprovante emitido e estoque atualizado.
                    </div>
                  ) : (
                    <button
                      onClick={() => setPaymentDone(true)}
                      disabled={pdvCart.length === 0}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-700 hover:from-amber-500 hover:to-emerald-600 disabled:opacity-40 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Receipt className="w-4 h-4" />
                      Fechar Venda (PIX / Cartão)
                    </button>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CARDÁPIO QR CODE */}
          {activeTab === "qr" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left benefits description */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  Autoatendimento sem filas
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  Seu cliente pede diretamente da mesa, sem esperar o garçom.
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed">
                  Gere QR Codes individuais para cada mesa ou balcão. O cliente acessa pelo próprio celular, sem necessidade de baixar nenhum aplicativo, escolhe os itens e envia o pedido direto para a produção.
                </p>

                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                    <span>Zero comissão ou taxa percentual sobre o que você vende.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                    <span>Fotos atraentes e personalização completa de adicionais.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                    <span>Fechamento imediato com chave PIX dinâmica por mesa.</span>
                  </div>
                </div>
              </div>

              {/* Right: Mobile QR Interface Preview */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-sm rounded-3xl bg-stone-900 border-2 border-white/10 p-5 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <div className="font-bold text-sm text-white">Cardápio Digital</div>
                      <div className="text-xs text-emerald-400 font-medium">Mesa #{tableNumber} • Atendimento Ativo</div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">Hambúrguer Prime</div>
                        <div className="text-emerald-400 font-bold">R$ 36,00</div>
                      </div>
                      <button
                        onClick={() => {
                          setQrSent(false);
                          setQrItems([{ item: SAMPLE_ITEMS[0], qty: 1 }]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
                      >
                        + Adicionar
                      </button>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">Batata Rústica</div>
                        <div className="text-emerald-400 font-bold">R$ 24,00</div>
                      </div>
                      <button
                        onClick={() => {
                          setQrSent(false);
                          setQrItems((prev) => [...prev, { item: SAMPLE_ITEMS[1], qty: 1 }]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>

                  {qrSent ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center text-emerald-300 text-xs font-semibold">
                      ✓ Pedido enviado para a cozinha com sucesso!
                    </div>
                  ) : (
                    <button
                      onClick={() => setQrSent(true)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Enviar Pedido da Mesa #{tableNumber} (R$ {totalQr.toFixed(2)})
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ESTOQUE */}
          {activeTab === "stock" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-white">
                  Controle de Estoque &amp; Baixa Automática por Receita
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Cadastre a ficha técnica dos seus produtos (ex: pão, carne, queijo por hambúrguer). Ao registrar a venda no PDV ou no Cardápio QR, o estoque abate os ingredientes instantaneamente.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs text-stone-400">Aviso de Estoque Mínimo</div>
                    <div className="text-base font-bold text-emerald-400 mt-1">Alerta Inteligente</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs text-stone-400">Curva de Consumo</div>
                    <div className="text-base font-bold text-emerald-400 mt-1">Sugestão de Compras</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-stone-900 border border-white/10 p-5 space-y-3">
                <div className="text-xs font-semibold text-stone-400 pb-2 border-b border-white/10">
                  Status de Insumos em Tempo Real
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02]">
                  <div>
                    <span className="font-semibold text-white">Pão Brioche Tradicional</span>
                    <span className="block text-[11px] text-stone-400">Estoque atual: 84 un</span>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">Normal</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02]">
                  <div>
                    <span className="font-semibold text-white">Carne Angus 160g (Blend)</span>
                    <span className="block text-[11px] text-stone-400">Estoque atual: 14 kg</span>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 font-semibold text-[10px]">Repor em 2 dias</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FINANÇAS */}
          {activeTab === "finance" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-white">
                  Visão Financeira Clara: Saiba Exatamente o Seu Lucro
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Chega de surpresas no fim do mês. Acompanhe entradas, saídas, taxas de maquininhas de cartão e contas a pagar em um demonstrativo gerencial simplificado.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs text-stone-400">Fluxo de Caixa Diário</div>
                    <div className="text-base font-bold text-white mt-1">Conciliação Automática</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs text-stone-400">Demonstrativo de Resultado</div>
                    <div className="text-base font-bold text-emerald-400 mt-1">DRE em 1 Clique</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-stone-900 border border-white/10 p-5 space-y-4">
                <div className="text-xs font-semibold text-stone-400 pb-2 border-b border-white/10 flex justify-between">
                  <span>Resumo do Mês em Exercício</span>
                  <span className="text-emerald-400 font-bold">+18.2% Lucro Líquido</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-300">
                    <span>(+) Faturamento Bruto de Vendas</span>
                    <span className="font-bold text-white">R$ 48.250,00</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>(-) Custos de Insumos &amp; Mercadorias</span>
                    <span className="text-red-400">R$ 14.800,00</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>(-) Despesas Fixas &amp; Operacionais</span>
                    <span className="text-red-400">R$ 9.400,00</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold">
                    <span className="text-white">Lucro Líquido Real</span>
                    <span className="text-emerald-400 font-extrabold">R$ 24.050,00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
