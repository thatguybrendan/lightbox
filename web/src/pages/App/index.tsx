import { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";

import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

import Header from "../../components/Header";
import "./App.css";
// import AdminPage from "./pages/Admin";
import SignInModal from "../SignInModal";

function App(props: PropsWithChildren<object>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <SignInModal />
        <Header />
        {props.children}
      </div>
    </QueryClientProvider>
  );
}

export default App;
