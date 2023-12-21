import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
