"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-stone-400 hover:text-paper hover:bg-white/5 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sair
    </button>
  );
}
