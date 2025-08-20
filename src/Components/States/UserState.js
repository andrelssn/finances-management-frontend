import { create } from "zustand";

const userAuthData = create((set) => ({
    user: null, // estado inicial do usuário
    addUser: (userData) => set({ user: userData }), // seta só o "user"
    clearUser: () => set({ user: null }), // opcional: para logout
}));

export default userAuthData;