export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Visão geral</h1>
      <p className="text-stone-400 text-sm">
        Bem-vindo ao SimplifyERP. Configure seus módulos em{" "}
        <a href="/dashboard/modulos" className="text-amber-400 font-semibold hover:text-amber-300">
          Módulos
        </a>
        .
      </p>
    </div>
  );
}
