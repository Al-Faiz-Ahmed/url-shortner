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
  selectedUrls: string[];
  

  // Actions
    setUrls: (urls: GeneratedURL[]) => void;
    addUrl: (url: GeneratedURL) => void;
    removeUrl: (id: string) => void;
    updateUrl: (id: string, updates: Partial<GeneratedURL>) => void;
    setSelectedUrls: (url: string[]) => void;
   
}
