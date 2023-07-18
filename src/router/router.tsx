import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { ROUTES } from "../constants/Routes";
import { Navbar } from "../components/organisms/Navbar";
import { Container } from "@mui/material";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Snackbar from "../components/atoms/Snackbar";

const NavbarLayout = () => (
  <>
    <Navbar />
    <Container>
      <Outlet />
      <Snackbar />
    </Container>
  </>
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTES.HOME,
        element: <NavbarLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUp />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
