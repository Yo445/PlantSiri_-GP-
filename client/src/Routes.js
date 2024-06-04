import { createBrowserRouter } from "react-router-dom";
import SensorInfo from "./pages/SensorPages/Sensor Info/SensorInfo";
import HomePage from "./pages/home/HomePage"
import NotFound from "./components/NotFound";
import App from "./App";
import AnalysisDashboard from "./pages/SensorPages/Analytics/AnalysisDashboard";
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
        element: <AnalysisDashboard/>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);