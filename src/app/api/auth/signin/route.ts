import { createUserToken, valideAuth } from "@/service/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Campos incompletos" },
        { status: 400 }
      );
    }

    const user = await valideAuth(email, password);
    if (!user)
      return NextResponse.json({ error: "Acesso negado" }, { status: 401 });

    const token = await createUserToken(user.id);

    return NextResponse.json({ user, token });
  } catch (error) {
    alert(error)
    console.error("Erro no POST /api/auth/signin:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
