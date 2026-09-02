import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";

const SESSION_COOKIE = "simplifyerp_session";

interface LoginResponse {
  mfaRequired: boolean;
  mfaChallengeToken?: string;
  account?: { id: string; name: string; email: string; role: string };
  tokens?: { accessToken: string; refreshToken: string };
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await apiFetch<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body,
    });

    if (result.mfaRequired || !result.tokens) {
      // MFA challenge UI is out of scope for this pass — surface the flag so
      // the client can show a clear message instead of pretending to log in.
      return NextResponse.json(
        { mfaRequired: true, message: "Este login requer verificação MFA, ainda não suportada nesta interface." },
        { status: 200 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, result.tokens.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ mfaRequired: false, account: result.account }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Não foi possível entrar." }, { status: 500 });
  }
}
