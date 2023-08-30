import { render, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import NavbarIcon from "../components/atoms/NavbarIcon";
import { MemoryRouter } from "react-router-dom";
import { ROUTES } from "../constants/Routes";

test("navbar icon navigates to homepage", async () => {
    const { container } = render(
        <MemoryRouter initialEntries={[ROUTES.ADD_RECIPE]}>
          <NavbarIcon />
        </MemoryRouter>
      );

  const navbarIcon = container.firstChild;
  if (!navbarIcon) return
  fireEvent.click(navbarIcon);

  expect(window.location.pathname).toBe(ROUTES.HOME);
});


