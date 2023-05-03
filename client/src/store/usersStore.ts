import { create } from "zustand";

import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {};
}

interface UserState {
  users: User[];
  loading: Boolean;
  hasErrors: Boolean;
  fetch: () => {};
}

export const usersStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  hasErrors: false,
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const res = await axios.get("http://localhost:5000/api/users");

      set((state) => ({ users: (state.users = res.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}));
