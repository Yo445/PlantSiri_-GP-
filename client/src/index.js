import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {router} from'./Routes'
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
let queryclient = new QueryClient()
root.render(

<QueryClientProvider client={queryclient}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
</QueryClientProvider>
);
