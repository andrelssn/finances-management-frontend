import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  // adicione o que precisar
}

interface UserAuthStore {
  user: User | null;
  addUser: (userData: User) => void;
  clearUser: () => void;
}

const userAuthData = create<UserAuthStore>((set) => ({
    user: null, // estado inicial do usuário
    addUser: (userData) => set({ user: userData }), // seta só o "user"
    clearUser: () => set({ user: null }), // opcional: para logout
}));

export default userAuthData;