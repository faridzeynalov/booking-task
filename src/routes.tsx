import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RoomDetailsPage from "./pages/DetailPage";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rooms/:roomId",
    element: <RoomDetailsPage />,
  },
]);
