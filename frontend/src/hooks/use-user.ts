// src/hooks/useUser.ts

import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/zustand";
import type { User } from "@/types";

/**
 * Hook for accessing user data (read-only)
 */
export const useUserData = () => {
  return useUserStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      error: state.error,
    }))
  );
};

/**
 * Hook for user actions only (no re-renders on state changes)
 */
export const useUserActions = () => {
  const setUser = useUserStore((state) => state.setUser);

  const updateUser = useUserStore((state) => state.updateUser);
  const setError = useUserStore((state) => state.setError);

  return { setUser, updateUser, setError };
};

/**
 * Combined hook for full user functionality
 */
export const useUser = () => {
  const data = useUserData();
  const actions = useUserActions();

  const updateProfile = useCallback(
    (updates: Partial<User>) => {
      actions.updateUser(updates);
    },
    [actions]
  );

  return {
    ...data,
    ...actions,
    updateProfile,
  };
};