import { createBrowserRouter } from "react-router-dom";
import SensorInfo from "./pages/SensorPages/Sensor Info/SensorInfo";
import HomePage from "./pages/home/HomePage"
import App from "./App";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sensor-info/:id",
        element: <SensorInfo />,
      },
      {
        path: "*",
        element: <HomePage />,
      },
    ],
  },
]);


