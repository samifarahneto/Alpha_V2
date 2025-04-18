import { NextResponse } from "next/server";
import usersData from "@/data/users.json";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const { nome, email, senha, perfil } = userData;

    // Verifica se o email já existe
    const existingUser = usersData.users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 }
      );
    }

    // Cria o novo usuário
    const newUser = {
      id: usersData.users.length + 1,
      nome,
      email,
      senha,
      perfil,
      dataCriacao: new Date().toISOString(),
    };

    // Adiciona o novo usuário ao array
    usersData.users.push(newUser);

    // Salva as alterações no arquivo
    const filePath = path.join(process.cwd(), "src/data/users.json");
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(usersData, null, 2),
      "utf-8"
    );

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao cadastrar usuário" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(usersData);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao carregar usuários" },
      { status: 500 }
    );
  }
}
