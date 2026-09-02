import { ModernNavbar } from "@/components/modern-navbar";
import { ModernHero } from "@/components/modern-hero";
import { ModernSolutions } from "@/components/modern-solutions";
import { ModernFeatures } from "@/components/modern-features";
import { ModernModules } from "@/components/modern-modules";
import { ModernComparison } from "@/components/modern-comparison";
import { ModernSecurity } from "@/components/modern-security";
import { ModernCta } from "@/components/modern-cta";
import { ModernFaq } from "@/components/modern-faq";
import { ModernFooter } from "@/components/modern-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. Navigation Header */}
      <ModernNavbar />

      {/* Main Flow */}
      <main className="flex-1 flex flex-col">
        {/* 2. Hero with Three.js module-constellation scene (scroll + mouse parallax) */}
        <ModernHero />

        {/* 3. Segment Solutions (Restaurantes, Varejo, Cafés, Mercados) */}
        <ModernSolutions />

        {/* 4. Interactive Live Simulator (PDV Express, Cardápio QR, Estoque, Finanças) */}
        <ModernFeatures />

        {/* 5. On-Demand Modular Pricing & Live Plan Customizer */}
        <ModernModules />

        {/* 6. Comparison Table: Legacy Old Systems vs SimplifyERP */}
        <ModernComparison />

        {/* 7. Enterprise Security & Reliability */}
        <ModernSecurity />

        {/* 8. Modern Free Trial Signup / Instant Tenant Setup */}
        <ModernCta />

        {/* 9. Interactive FAQ Accordion */}
        <ModernFaq />
      </main>

      {/* 10. Modern Sleek Footer */}
      <ModernFooter />
    </div>
  );
}
