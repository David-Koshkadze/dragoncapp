import { create } from "zustand";

import axios from "axios";

const baseURL = "http://localhost:5000";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
}

interface UserState {
  users: User[];
  loading: Boolean;
  hasErrors: Boolean;
  fetch: () => {};
  deleteUser: (userId: number) => {};
}

export const usersStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  hasErrors: false,
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const res = await axios.get(`${baseURL}/api/users`);

      set((state) => ({ users: (state.users = res.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`${baseURL}/api/users/${userId}`);
      set((state) => ({
        users: state.users.filter((item) => item.id != userId),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
