import { create } from "zustand";

import axios from "axios";

import { User } from "../types/userTypes";

const baseURL = "http://localhost:5000";

interface UserState {
  users: User[];
  loading: Boolean;
  hasErrors: Boolean;
  fetch: () => {};
  addUser: (user: User) => {};
  updateUser: (userId: number, updatedUser: User) => {};
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

  addUser: async (user) => {
    try {
      const res = await axios.post(`${baseURL}/api/users`, user);
      set((state) => ({ users: [...state.users, res.data] }));
    } catch (error) {
      console.error(error);
    }
  },

  updateUser: async (userId, updatedUser) => {
    try {
      await axios.put(`${baseURL}/api/users/${userId}`, updatedUser);

      set((state) => ({
        users: state.users.map((user) => {
          if (user.id === userId) {
            return { ...user, ...updatedUser };
          }
          return user;
        }),
      }));
    } catch (err) {
      console.error(err);
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
