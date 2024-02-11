import { createBrowserRouter } from "react-router-dom";

import Watering from "./components/Watering/Watering";
import Calendar from "./components/Calendar/Calendar";
import Camera from "./components/Camera/Camera";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/watering",
        element: <Watering />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/camera",
        element: <Camera />,
      },
    ],
  },
]);

export default router;
