import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { ROUTES } from "../constants/Routes";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Recipe from "../pages/Recipe";
import AddRecipe from "../pages/AddRecipe";
import EditRecipe from "../pages/EditRecipe";
import ShoppingList from "../pages/ShoppingList";
import RootContainer from "./RootContainer";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PrivateRoute />,
    children: [
      {
        element: <RootContainer />,
        children: [
          {
            index: true,
            path: ROUTES.HOME,
            element: <Home />,
          },
          {
            index: true,
            path: `${ROUTES.RECIPE}/:id`,
            element: <Recipe />,
          },
          {
            index: true,
            path: ROUTES.ADD_RECIPE,
            element: <AddRecipe />,
          },
          {
            index: true,
            path: ROUTES.SHOPPING_LIST,
            element: <ShoppingList />,
          },
          {
            index: true,
            path: `${ROUTES.EDIT_RECIPE}/:id`,
            element: <EditRecipe />,
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
