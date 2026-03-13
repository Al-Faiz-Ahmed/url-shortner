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
    loader: slugLoader,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
