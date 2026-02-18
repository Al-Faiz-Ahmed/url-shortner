// src/hooks/useUrls.ts

import { useCallback, useEffect } from "react";
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
      isLoading: state.isLoading,
      error: state.error,
      totalCount: state.totalCount,
    }))
  );
};

/**
 * Hook for URL actions only
 */
export const useUrlActions = () => {
  const fetchUrls = useUrlStore((state) => state.fetchUrls);
  const createUrl = useUrlStore((state) => state.createUrl);
  const deleteUrl = useUrlStore((state) => state.deleteUrl);
  const updateUrl = useUrlStore((state) => state.updateUrl);
  const setSelectedUrl = useUrlStore((state) => state.setSelectedUrl);
  const setError = useUrlStore((state) => state.setError);

  return { fetchUrls, createUrl, deleteUrl, updateUrl, setSelectedUrl, setError };
};

/**
 * Hook for selected URL
 */
export const useSelectedUrl = () => {
  const selectedUrl = useUrlStore((state) => state.selectedUrl);
  const setSelectedUrl = useUrlStore((state) => state.setSelectedUrl);

  const selectUrl = useCallback(
    (url: GeneratedURL | null) => {
      setSelectedUrl(url);
    },
    [setSelectedUrl]
  );

  return { selectedUrl, selectUrl };
};

/**
 * Combined hook with auto-fetch on mount
 */
export const useUrls = (autoFetch: boolean = true) => {
  const data = useUrlData();
  const actions = useUrlActions();
  const { selectedUrl, selectUrl } = useSelectedUrl();

  useEffect(() => {
    if (autoFetch && data.urls.length === 0 && !data.isLoading) {
      actions.fetchUrls();
    }
  }, [autoFetch]); // intentionally minimal deps to run once

  const activeUrls = data.urls.filter((url) => !url.isBlock);
  const inactiveUrls = data.urls.filter((url) => url.isBlock);

  const getUrlById = useCallback(
    (id: string): GeneratedURL | undefined => {
      return data.urls.find((url:GeneratedURL) => url.id === id);
    },
    [data.urls]
  );

  const shortenUrl = useCallback(
    async (originalUrl: string) => {
      await actions.createUrl(originalUrl);
    },
    [actions]
  );

  const removeUrl = useCallback(
    async (id: string) => {
      await actions.deleteUrl(id);
    },
    [actions]
  );

  const refresh = useCallback(() => {
    actions.fetchUrls();
  }, [actions]);

  return {
    ...data,
    selectedUrl,
    selectUrl,
    activeUrls,
    inactiveUrls,
    getUrlById,
    shortenUrl,
    removeUrl,
    refresh,
    ...actions,
  };
};