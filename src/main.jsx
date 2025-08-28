import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes/routes.jsx";
import { Provider } from "react-redux";
import { store } from "./app/services/store.js";

createRoot(document.getElementById("root")).render(
 <Provider store={store}>
   <RouterProvider router={router}>
  </RouterProvider>
 </Provider>
);
