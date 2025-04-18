import usersData from "../data/users.json";

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  dataCriacao: string;
}

interface UserService {
  register: (user: Omit<User, "id" | "dataCriacao">) => Promise<User>;
  login: (email: string, senha: string) => Promise<User | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
}

const userService: UserService = {
  register: async (userData) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao cadastrar usuário");
    }

    return response.json();
  },

  login: async (email, senha) => {
    const user = usersData.users.find(
      (u) => u.email === email && u.senha === senha
    );
    return user || null;
  },

  getUserByEmail: async (email) => {
    const user = usersData.users.find((u) => u.email === email);
    return user || null;
  },
};

export default userService;
