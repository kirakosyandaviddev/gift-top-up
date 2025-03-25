import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {HomePage} from "../pages/HomePage/HomePage";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {RoulettePage} from "../pages/RoulettePage/RoulettePage";
import {NotFoundPage} from "../pages/NotFoundPage/NotFoundPage";

import {Layout} from "../components/Layout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: 'main', element: <HomePage /> },
        { path: 'roulette', element: <RoulettePage /> },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ],
  {
    basename: '/',
});

export const Router = () => {
  return <RouterProvider router={router} />;
}