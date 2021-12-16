import React, { useState } from "react";
import { Router, Redirect, useLocation } from "@reach/router";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// @ts-ignore
import { ModalContext } from "@/contexts/ModalContext";
import "./assets/css/styles.css";

const UNPROTECTED_ROUTES = ["/login", "/login/reset", "/reset", "/recovery"];

const queryClient = new QueryClient();

const App: React.VFC = (): JSX.Element => {
  const [modalValue, setModalValue] = useState({ logsModal: false });
  const isAuthenticated = Cookies.get("accessToken");
  const { pathname } = useLocation();

  // if (!isAuthenticated && !UNPROTECTED_ROUTES.includes(pathname)) {
  //   return <Redirect noThrow={true} to="/login" />;
  // }

  return (
    <ModalContext.Provider value={[modalValue, setModalValue]}>
      <QueryClientProvider client={queryClient}>
        <div>Hello!</div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ModalContext.Provider>
  );
};

export default App;
