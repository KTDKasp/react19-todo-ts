import { Button, FolderList, TodoList, TodoSidebar } from "src/shared/ui";
import styles from "./todo.module.css";
import { fetchList, ListItem } from "src/shared/lib/api";
import { useState } from "react";

const defaultListPromise = fetchList();

export function Todo() {
  const [tasksPromise, setTasksPromise] = useState(defaultListPromise)
  const [isOpened, setIsOpened] = useState(false);
  
  return (
    <div className={styles.todo}>
      <TodoSidebar>
        <Button icon="list">Все задачи</Button>
        <FolderList tasksPromise={tasksPromise} />
        <Button onClick={() => setIsOpened(true)} icon="add" color="grey">Добавить папку</Button>
        <form style={{ display: isOpened === true ? "block" : "none" }}>
          <p>Форма для заполнения</p>
          <button type="button" onClick={() => setIsOpened(false)}>Close</button>
        </form>
      </TodoSidebar>
      <TodoList />
    </div>
  )
}