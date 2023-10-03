import { create } from "zustand";

type IUserStore = {
  isLoggedIn: boolean;
  authenticate: (token: string, userId: number) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),

  authenticate: (token: string, userId: number) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    set({ isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    set({ isLoggedIn: false });
  },
}));

export default useUserStore;
