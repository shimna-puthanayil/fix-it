import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./pages/Profile";
import Complaint from "./pages/Complaint";
import UpdateComplaint from "./pages/UpdateComplaint";
import ApproveComplaint from "./pages/ApproveComplaint";
import ErrorPage from "./pages/404";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignIn />,
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
      {
        path: "/complaint/:id",
        element: <Complaint />,
      },
      {
        path: "/update/complaint/:id",
        element: <UpdateComplaint />,
      },
      {
        path: "/approve/complaint/:id",
        element: <ApproveComplaint />,
      },
    ],
  },
]);
ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
