import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";

const SESSION_COOKIE = "simplifyerp_session";

interface CreateTenantResponse {
  account: { id: string; name: string; email: string; role: string };
  tenant: { id: string; name: string };
  establishment: { id: string; name: string };
  tokens: { accessToken: string; refreshToken: string };
}

// Só o super admin cria tenants (modelo de consultoria) — o backend também
// reforça isso em SignupService. Não altera o cookie de sessão de quem chama:
// quem está criando é o admin, não o dono recém-criado.
export async function POST(request: NextRequest) {
  const body = await request.json();

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  try {
    const result = await apiFetch<CreateTenantResponse>("/v1/signup", {
      method: "POST",
      body,
      token,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Não foi possível criar o tenant." }, { status: 500 });
  }
}
