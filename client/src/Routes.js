import { createBrowserRouter } from "react-router-dom";
import SensorInfo from "./pages/SensorPages/Sensor Info/SensorInfo";
import HomePage from "./pages/home/HomePage"
import NotFound from "./components/NotFound";
import App from "./App";
import Loading from "./components/Loading";
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
        path: "/water",
        element: <Loading />,
      },
      {
        path: "/analysis",
        element: <AnalysisDashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);


