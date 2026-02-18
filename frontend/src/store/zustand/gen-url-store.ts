// src/store/urlStore.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UrlState } from "./store.types";

export const useUrlStore = create<UrlState>()(
  devtools(
    (set) => ({
      // Initial State
      generatedURLs: [],
      selectedUrls:[],
      

      // Synchronous Actions
      setUrls: (urls) =>
        set(
          { generatedURLs: urls, },
          false,
          "setUrls",
        ),

      addUrl: (url) =>
        set(
          (state) => ({
            generatedURLs: [url, ...state.generatedURLs]
           
          }),
          false,
          "addUrl",
        ),

      removeUrl: (id) =>
        set(
          (state) => ({
            urls: state.generatedURLs.filter((url) => url.id !== id),
            
            selectedUrls: state.selectedUrls && state.selectedUrls.length > 0 ? state.selectedUrls.filter((previousURLId) => previousURLId !== id) : [],
              
          }),
          false,
          "removeUrl",
        ),

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

      setSelectedUrls: (urlId) =>
        set((state)=>({
             selectedUrls:state.selectedUrls && state.selectedUrls.length > 0 ? [...state.selectedUrls,...urlId] : [...urlId]
        }),false, "setSelectedUrl"),


      // Async Actions
    

     

    }),
    { name: "UrlStore" },
  ),
);
