import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";

const SESSION_COOKIE = "simplifyerp_session";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  try {
    const result = await apiFetch<{ otpauthUrl: string }>("/v1/auth/mfa/setup", { method: "POST", token });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Não foi possível iniciar a configuração do MFA." }, { status: 500 });
  }
}
