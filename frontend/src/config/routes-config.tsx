import { Home } from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/:slug",
  //   element: <SlugPage />,
  //   loader: slugLoader,          // fetches + resolves before render
  //   errorElement: <NotFound />,  // shown if loader throws
  // },
]);