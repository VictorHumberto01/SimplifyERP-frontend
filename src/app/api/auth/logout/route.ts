import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "simplifyerp_session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ message: "Sessão encerrada." }, { status: 200 });
}
