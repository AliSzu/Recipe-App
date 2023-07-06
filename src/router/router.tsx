import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { ROUTES } from "../constants/routes";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
]);

export default router;
