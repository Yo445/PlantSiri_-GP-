import { createBrowserRouter } from "react-router-dom";


import Layout from "./Layout";
import Analysis from "./pages/Analysis/Analysis";
import Wheat from "./pages/Wheat";
import Corn from "./pages/Corn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/Analysis",
        element: <Analysis />,
      },
      {
        path: "/Wheat",
        element: <Wheat />,
      },
      {
        path: "/Corn",
        element: <Corn />,
      },
    ],
  },
]);

export default router;
