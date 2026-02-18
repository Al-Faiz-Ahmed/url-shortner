// src/store/urlStore.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UrlState } from "./store.types";

export const useUrlStore = create<UrlState>()(
  devtools(
    (set, get) => ({
      // Initial State
      urls: [],
      selectedUrl: null,
      isLoading: false,
      error: null,
      totalCount: 0,

      // Synchronous Actions
      setUrls: (urls) =>
        set(
          { generatedURLs: urls, totalCount: urls.length, error: null },
          false,
          "setUrls",
        ),

      addUrl: (url) =>
        set(
          (state) => ({
            urls: [url, ...state.generatedURLs],
            totalCount: state.totalCount + 1,
          }),
          false,
          "addUrl",
        ),

      removeUrl: (id) =>
        set(
          (state) => ({
            urls: state.generatedURLs.filter((url) => url.id !== id),
            totalCount: state.totalCount - 1,
            selectedUrl:
              state.selectedUrl?.id === id ? null : state.selectedUrl,
          }),
          false,
          "removeUrl",
        ),

      updateUrl: (id, updates) =>
        set(
          (state) => ({
            urls: state.generatedURLs.map((url) =>
              url.id === id ? { ...url, ...updates } : url,
            ),
            selectedUrl:
              state.selectedUrl?.id === id
                ? { ...state.selectedUrl, ...updates }
                : state.selectedUrl,
          }),
          false,
          "updateUrl",
        ),

      setSelectedUrl: (url) =>
        set({ selectedUrl: url }, false, "setSelectedUrl"),

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      // Async Actions
      fetchUrls: async () => {
        set({ isLoading: true, error: null }, false, "fetchUrls/pending");
        try {
          const response = await fetch("/api/urls");

          if (!response.ok) {
            throw new Error("Failed to fetch URLs");
          }

          const data = await response.json();

          set(
            {
              generatedURLs: data.urls,
              totalCount: data.urls.length,
              isLoading: false,
              error: null,
            },
            false,
            "fetchUrls/fulfilled",
          );
        } catch (error) {
          set(
            {
              isLoading: false,
              error:
                error instanceof Error ? error.message : "Failed to fetch URLs",
            },
            false,
            "fetchUrls/rejected",
          );
        }
      },

      createUrl: async (originalUrl: string) => {
        set({ isLoading: true, error: null }, false, "createUrl/pending");
        try {
          const response = await fetch("/api/urls", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalUrl }),
          });

          if (!response.ok) {
            throw new Error("Failed to create URL");
          }

          const data = await response.json();

          set(
            (state) => ({
              urls: [data.url, ...state.generatedURLs],
              totalCount: state.totalCount + 1,
              isLoading: false,
              error: null,
            }),
            false,
            "createUrl/fulfilled",
          );
        } catch (error) {
          set(
            {
              isLoading: false,
              error:
                error instanceof Error ? error.message : "Failed to create URL",
            },
            false,
            "createUrl/rejected",
          );
        }
      },

      deleteUrl: async (id: string) => {
        const previousUrls = get().generatedURLs;
        // Optimistic update
        set(
          (state) => ({
            urls: state.generatedURLs.filter((url) => url.id !== id),
            totalCount: state.totalCount - 1,
          }),
          false,
          "deleteUrl/optimistic",
        );

        try {
          const response = await fetch(`/api/urls/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete URL");
          }
        } catch (error) {
          // Rollback on failure
          set(
            {
              generatedURLs: previousUrls,
              totalCount: previousUrls.length,
              error:
                error instanceof Error ? error.message : "Failed to delete URL",
            },
            false,
            "deleteUrl/rollback",
          );
        }
      },
    }),
    { name: "UrlStore" },
  ),
);
