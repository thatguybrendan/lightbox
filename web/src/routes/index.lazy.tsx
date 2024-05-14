import { createLazyFileRoute } from "@tanstack/react-router";
import ChatWindow from "../pages/ChatWindow";
export const Route = createLazyFileRoute("/")({
  component: () => <ChatWindow />,
});
