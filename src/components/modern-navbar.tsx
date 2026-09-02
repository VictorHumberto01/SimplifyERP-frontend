"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#demonstracao", label: "Simulador" },
  { href: "#modulos", label: "Módulos & Preços" },
  { href: "#comparativo", label: "Vantagens" },
  { href: "#seguranca", label: "Confiabilidade" },
];

export function ModernNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-950/95 border-b border-amber-500/15 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-sans font-bold text-2xl tracking-tight text-paper">
            Simplify
          </span>
          <span className="font-display italic font-medium text-2xl tracking-tight text-amber-400">
            ERP
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-stone-400">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative hover:text-paper transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-5">
          <a
            href="/login"
            className="text-sm font-medium text-stone-400 hover:text-paper transition-colors"
          >
            Acessar conta
          </a>

          <a
            href="#comecar"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-none bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors"
          >
            Fale com a gente
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-paper"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-amber-500/15 px-6 py-6 mt-3 space-y-4">
          <nav className="flex flex-col gap-4 text-base font-medium text-stone-300">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
            <a
              href="#comecar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-amber-400 text-stone-950 font-bold"
            >
              Fale com a gente
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
