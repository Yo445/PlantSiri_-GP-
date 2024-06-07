import { createBrowserRouter } from "react-router-dom";
import SensorInfo from "./pages/SensorPages/DisplaySensor/SensorInfo.jsx";
import HomePage from "./pages/home/HomePage"
import NotFound from "./components/NotFound";
import App from "./App";
import Dashboard from "./pages/SensorPages/Dashboard/Dashboard"
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
        path: "/analysis",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);