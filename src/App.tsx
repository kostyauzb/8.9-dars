import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Library from "./pages/Library";
import Login from "./components/Login";
import About from "./About";
import Protected from "./components/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Library />
      </Protected>
    ) as JSX.Element,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
