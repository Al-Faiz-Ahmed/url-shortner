// src/store/userStore.ts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { UserState } from "./store.types";

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Synchronous Actions
        setUser: (user) =>
          set(
            { user, isAuthenticated: true, error: null },
            false,
            "setUser"
          ),

        clearUser: () =>
          set(
            { user: null, isAuthenticated: false, error: null },
            false,
            "clearUser"
          ),
        setLoading: (isLoading) =>
          set({ isLoading }, false, "setLoading"),

        setError: (error) =>
          set({ error }, false, "setError"),

        updateUser: (updates) => {
          const currentUser = get().user;
          if (currentUser) {
            set(
              { user: { ...currentUser, ...updates } },
              false,
              "updateUser"
            );
          }
        },

        // Async Actions
        loginUser: async (email: string, _password: string) => {
          set({ isLoading: true, error: null }, false, "loginUser/pending");
          try {
            // Replace with your actual API call
            const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password: _password }),
            });

            if (!response.ok) {
              throw new Error("Login failed");
            }

            const data = await response.json();

            set(
              {
                user: data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              },
              false,
              "loginUser/fulfilled"
            );
          } catch (error) {
            set(
              {
                isLoading: false,
                error:
                  error instanceof Error ? error.message : "Login failed",
                isAuthenticated: false,
                user: null,
              },
              false,
              "loginUser/rejected"
            );
          }
        },

        logoutUser: () => {
          set(
            {
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            },
            false,
            "logoutUser"
          );
          // Optional: call logout API
          // fetch("/api/auth/logout", { method: "POST" });
        },
      }),
      {
        name: "user-storage", // localStorage key
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }), // only persist these fields
      }
    ),
    { name: "UserStore" } // devtools label
  )
);