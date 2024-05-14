import { createRootRoute, Outlet } from "@tanstack/react-router";
import App from "../pages/App/";

export const Route = createRootRoute({
  component: () => (
    <App>
      <Outlet />
    </App>
  ),
});
