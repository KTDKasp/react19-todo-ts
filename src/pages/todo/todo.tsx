import { Button, FolderList, TodoList, TodoSidebar } from "src/shared/ui";
import styles from "./todo.module.css";

export function Todo() {
  return (
    <div className={styles.todo}>
      <TodoSidebar>
        <Button icon="list">All tasks</Button>
        <FolderList />
      </TodoSidebar>
      <TodoList />
    </div>
  )
}