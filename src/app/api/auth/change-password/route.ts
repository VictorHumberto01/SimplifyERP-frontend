import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";

const SESSION_COOKIE = "simplifyerp_session";

// Trocar a senha revoga todas as sessões no backend — limpamos o cookie aqui
// também, então o usuário precisa logar de novo com a senha nova.
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  try {
    const result = await apiFetch("/v1/auth/change-password", { method: "PUT", body, token });
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Não foi possível trocar a senha." }, { status: 500 });
  }
}
