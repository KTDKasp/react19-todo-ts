import { Button, TodoList, TodoSidebar } from "src/shared/ui";
import styles from "./todo.module.css";

export function Todo() {
  return (
    <div className={styles.todo}>
      <TodoSidebar>
        Button
        <Button icon="list">
          All tasks
        </Button>
      </TodoSidebar>
      <TodoList />
    </div>
  )
}