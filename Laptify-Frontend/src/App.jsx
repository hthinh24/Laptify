import AdminPage from "@/pages/admin/index.jsx";
import "./App.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "@/router/router.jsx";
import { Provider } from "react-redux";
import store from "@/feature/store.js";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
