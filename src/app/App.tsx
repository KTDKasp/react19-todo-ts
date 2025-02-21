import { ErrorPage, Todo } from "src/pages";
import styles from "./app.module.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Todo />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])

export default function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  )
}
