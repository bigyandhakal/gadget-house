import { createBrowserRouter, BrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"*",
    element:<Error/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
