// src/hooks/useUrls.ts

import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUrlStore } from "@/store/zustand";
import type { GeneratedURL } from "@/types";

/**
 * Hook for accessing URL list data (read-only)
 */
export const useUrlData = () => {
  return useUrlStore(
    useShallow((state) => ({
      urls: state.generatedURLs,
    })),
  );
};

/**
 * Hook for URL actions only
 */
export const useUrlActions = () => {
  const updateUrl = useUrlStore((state) => state.updateUrl);
  const setUrls = useUrlStore((state) => state.setUrls);
  const addUrl = useUrlStore((state) => state.addUrl);
  const setSelectedUrl = useUrlStore((state) => state.setSelectedUrl);
  const removeAllSelectedUrl = useUrlStore((state) => state.removeAllSelectedUrl);
  const removeMultipleUrls = useUrlStore((state) => state.removeMultipleUrls);
  const removeUrl = useUrlStore((state) => state.removeUrl);

  return { updateUrl, setSelectedUrl, removeUrl, setUrls,addUrl,removeAllSelectedUrl,removeMultipleUrls };
};

/**
 * Hook for selected URL
 */
export const useSelectedUrl = () => {
  const selectedUrls = useUrlStore((state) => state.selectedUrls);
  const setSelectedUrl = useUrlStore((state) => state.setSelectedUrl);
  const removeAllSelectedURL = useUrlStore((state) => state.removeAllSelectedUrl);

  type selectUrlType = "add" | "remove";

  const selectUrl = useCallback(
    (urlId: string, type?: selectUrlType) => {
      setSelectedUrl(urlId,type);
    },
    [setSelectedUrl],
  );

  return { selectedUrls, selectUrl,removeAllSelectedURL };
};

/**
 * Combined hook with auto-fetch on mount
 */
export const useUrls = () => {
  const data = useUrlData();
  const actions = useUrlActions();
  const { selectUrl, selectedUrls } = useSelectedUrl();

  // intentionally minimal deps to run once

  const activeUrls = data.urls.filter((url) => !url.isBlock);
  const inactiveUrls = data.urls.filter((url) => url.isBlock);

  const getUrlById = useCallback(
    (id: string): GeneratedURL | undefined => {
      return data.urls.find((url: GeneratedURL) => url.id === id);
    },
    [data.urls],
  );


  const removeUrlByid = useCallback(
    async (id: string) => {
      console.log("I am just called by yout side");
      
      actions.removeUrl(id);
    },
    [actions],
  );
  const removeMultipleUrls = useCallback(
    async (ids:string[]) => {
      console.log("I am just called by yout side");
      
      actions.removeMultipleUrls(ids);
    },
    [actions],
  );
  const removeAllSelectedUrls = useCallback(
    async () => {
      console.log("I am just called by yout side");
      
      actions.removeAllSelectedUrl();
    },
    [actions],
  );

  

  const setAllUrls = useCallback(
    async (urls: GeneratedURL[]) => {
      actions.setUrls(urls);
    },
    [actions],
  );

  return {
    ...data,
    selectUrl,
    selectedUrls,
    removeMultipleURLS:removeMultipleUrls,
    removeAllSelectedUrls,
    activeUrls,
    inactiveUrls,
    getUrlById,
    setAllUrls,
    removeUrlByid,
    ...actions,
  };
};
