import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client/apollo-client.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
