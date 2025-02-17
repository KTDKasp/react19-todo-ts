import { Todo } from "src/pages";
import styles from "./app.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Todo />
    </div>
  )
}
