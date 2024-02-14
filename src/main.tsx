import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// {
//   defaultOptions: {
//     queries: {
//       retry: 3,
//       cacheTime: 300_000, //5 min
//       staleTime: 10 * 1000, // 10s
//       // refetchOnWindowFocus:true
//       // refetchOnReconnect:true
//       // refetchOnMount:false
//     },
//   },
// }

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
