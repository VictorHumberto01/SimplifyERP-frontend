import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";

const SESSION_COOKIE = "simplifyerp_session";

export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/establishment/modules/[module]">) {
  const { module } = await ctx.params;
  const body = await request.json();

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  try {
    const result = await apiFetch(`/v1/establishment/modules/${module}`, {
      method: "PATCH",
      body,
      token,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Não foi possível atualizar o módulo." }, { status: 500 });
  }
}
