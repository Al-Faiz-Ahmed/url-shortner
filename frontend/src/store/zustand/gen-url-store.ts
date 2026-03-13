// src/store/urlStore.ts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { UrlState } from "./store.types";

export const useUrlStore = create<UrlState>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        generatedURLs: [],
        selectedUrls: [],

        // Synchronous Actions
        setUrls: (urls) => set({ generatedURLs: [...urls] }, false, "setUrls"),

        addUrl: (url) =>
          set(
            (state) => ({
              generatedURLs: [url, ...state.generatedURLs],
            }),
            false,
            "addUrl",
          ),

        removeUrl: (id) =>
          set(
            (state) => ({
              generatedURLs: state.generatedURLs.filter((url) => url.id !== id),
              selectedUrls: state.selectedUrls
                ? state.selectedUrls.filter(
                    (previousURLId) => previousURLId !== id,
                  )
                : [],
            }),
            false,
            "removeUrl",
          ),
          removeMultipleUrls: (ids) => set((state)=>({
            generatedURLs: state.generatedURLs.filter((url) => !ids.includes(url.id))
          }),
          false,
          "removeUrl",),

        updateUrl: (id, updates) =>
          set(
            (state) => ({
              generatedURLs: state.generatedURLs.map((url) =>
                url.id === id ? { ...url, ...updates } : url,
              ),
            }),
            false,
            "updateUrl",
          ),

        setSelectedUrl: (urlId, type = "add") =>
          set(
            (state) => ({
              selectedUrls:
                type === "add"
                  ? [...state.selectedUrls, urlId]
                  : state.selectedUrls.filter((filterId) => filterId !== urlId),
            }),
            false,
            "setSelectedUrl",
          ),
        removeAllSelectedUrl: () => {
          return set(
            () => ({
              selectedUrls: [],
            }),
            false,
            "removeAllSelectedUrl",
          );
        },

        // Async Actions
      }),
      {
        name: "url-storage", // localStorage key
        partialize: (state) => ({
          generatedURLs: state.generatedURLs,
        }), // only persist these fields
      },
    ),
    { name: "UrlStore" },
  ),
);
