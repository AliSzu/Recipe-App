import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { ROUTES } from "../constants/routes";
import { Navbar } from "../components/molecules/Navbar";
import { Container } from "@mui/material";

const NavbarLayout = () => (
  <>
    <Navbar />
    <Container>
      <Outlet />
    </Container>
  </>
);

const router = createBrowserRouter([
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
