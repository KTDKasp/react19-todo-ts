import { AddFolderForm, Button, FolderList, TodoList, TodoSidebar } from "src/shared/ui";
import styles from "./todo.module.css";
import { fetchColors, fetchList } from "src/shared/lib/api";
import { useState } from "react";

const defaultListPromise = fetchList();
const defaultColorsPromise = fetchColors();

export function Todo() {
  const [tasksPromise, setTasksPromise] = useState(defaultListPromise)
  const [isOpened, setIsOpened] = useState(false);
  
  return (
    <div className={styles.todo}>
      <TodoSidebar>
        <Button icon="list">Все задачи</Button>
        <FolderList tasksPromise={tasksPromise} />
        <Button onClick={() => setIsOpened(true)} icon="add" color="grey">Добавить папку</Button>
        {isOpened && <AddFolderForm taskColors={defaultColorsPromise} onClose={() => setIsOpened(false)} />}
      </TodoSidebar>
      <TodoList />
    </div>
  )
}