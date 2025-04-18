import { NextResponse } from "next/server";
import usersData from "@/data/users.json";
import fs from "fs";
import path from "path";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const updatedUser = await request.json();

    const userIndex = usersData.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    usersData.users[userIndex] = {
      ...usersData.users[userIndex],
      ...updatedUser,
    };

    // Salva as alterações no arquivo
    const filePath = path.join(process.cwd(), "src/data/users.json");
    fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json(usersData.users[userIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const userIndex = usersData.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    usersData.users.splice(userIndex, 1);

    // Salva as alterações no arquivo
    const filePath = path.join(process.cwd(), "src/data/users.json");
    fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}
