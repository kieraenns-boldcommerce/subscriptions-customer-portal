import { QueryClient, QueryClientProvider } from "react-query";
import { Resets, Vars, Fonts } from "./globalStyles";
import IndexPage from "./pages/index";
import AppStateProvider from "./providers/AppStateProvider";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>

      <AppStateProvider>
        <Fonts />
        <Resets />
        <Vars />
  
        <IndexPage />
      </AppStateProvider>

    </QueryClientProvider>
  );
};

export default App;
