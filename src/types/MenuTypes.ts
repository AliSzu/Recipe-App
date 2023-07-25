import { ROUTES } from "../constants/Routes";

export interface MenuItem {
  title: string;
  route: keyof typeof ROUTES;
  id: string
}
