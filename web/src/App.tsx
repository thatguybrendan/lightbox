import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

import Header from "./components/Header";
import "./App.css";
import AdminPage from "./pages/Admin";
import SignInModal from "./pages/SignInModal";

function App() {
  const user = false;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {!user && <SignInModal />}
        {user && (
          <>
            <Header />
            <AdminPage />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
