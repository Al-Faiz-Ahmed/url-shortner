import { Home } from "@/pages/home";
import NotFound from "@/pages/not-found";
import SlugPage from "@/pages/url-finder";
import { slugLoader } from "@/utils/slug-loader";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:slug",
    element: <SlugPage />,
    // hydrateFallbackElement:'<p>faizan</p>',
    loader: slugLoader,          // fetches + resolves before render
    errorElement: <NotFound />,  // shown if loader throws
  },
]);