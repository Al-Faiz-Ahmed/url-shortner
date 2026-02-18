// src/hooks/useUrls.ts

import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUrlStore } from "@/store/zustand";
import type {  GeneratedURL} from "@/types";

/**
 * Hook for accessing URL list data (read-only)
 */
export const useUrlData = () => {
  return useUrlStore(
    useShallow((state) => ({
      urls: state.generatedURLs,
    }))
  );
};

/**
 * Hook for URL actions only
 */
export const useUrlActions = () => {
  
  const updateUrl = useUrlStore((state) => state.updateUrl);
  const setSelectedUrls = useUrlStore((state) => state.setSelectedUrls);
  const removeUrl = useUrlStore((state) => state.removeUrl);
  

  return { updateUrl, setSelectedUrls, removeUrl };
};

/**
 * Hook for selected URL
 */
export const useSelectedUrl = () => {
  const selectedUrls = useUrlStore((state) => state.selectedUrls);
  const setSelectedUrls = useUrlStore((state) => state.setSelectedUrls);
  

  const selectUrl = useCallback(
    (urlId: string) => {

      setSelectedUrls([urlId]);
    },
    [setSelectedUrls]
  );

  return { selectedUrls, selectUrl };
};

/**
 * Combined hook with auto-fetch on mount
 */
export const useUrls = () => {
  const data = useUrlData();
  const actions = useUrlActions();
  const {  selectUrl } = useSelectedUrl();

  // intentionally minimal deps to run once

  const activeUrls = data.urls.filter((url) => !url.isBlock);
  const inactiveUrls = data.urls.filter((url) => url.isBlock);

  const getUrlById = useCallback(
    (id: string): GeneratedURL | undefined => {
      return data.urls.find((url:GeneratedURL) => url.id === id);
    },
    [data.urls]
  );

  

  const removeUrlByid = useCallback(
    async (id: string) => {
      actions.removeUrl(id);
    },
    [actions]
  );

 

  return {
    ...data,
    selectUrl,
    activeUrls,
    inactiveUrls,
    getUrlById,
    removeUrl: removeUrlByid,
    ...actions,
  }
}