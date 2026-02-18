import type { GeneratedURL, User } from "@/types";

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  //   // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;

  //   clearUser: () => void;
  //   loginUser: (email: string, password: string) => Promise<void>;
  //   logoutUser: () => void;
}

export interface UrlState {
  generatedURLs: GeneratedURL[];
  selectedUrl: GeneratedURL | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;

  // Actions
    setUrls: (urls: GeneratedURL[]) => void;
    addUrl: (url: GeneratedURL) => void;
    removeUrl: (id: string) => void;
    updateUrl: (id: string, updates: Partial<GeneratedURL>) => void;
    setSelectedUrl: (url: GeneratedURL | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchUrls: () => Promise<void>;
    createUrl: (originalUrl: string) => Promise<void>;
    deleteUrl: (id: string) => Promise<void>;
}
