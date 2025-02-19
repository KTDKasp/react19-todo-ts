import React from "react";
import { Button } from "../button/button";

import styles from "./add-todo-form.module.css";

type AddTodoFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  onClose: () => void;
  ref?: React.Ref<HTMLInputElement>
}

export function AddTodoForm({ ref, onClose, ...props }: AddTodoFormProps) {
  const [todo, setTodo] = React.useState('');

  return (
    <form className={styles.form} {...props}>
    <input ref={ref} className={styles.input} type="text" value={todo} onChange={e => setTodo(e.target.value)}/>
    <div className={styles.actions}>
      <Button color="green">Добавить задачу</Button>
      <Button color="grey" onClick={onClose}>Отмена</Button>
    </div>
  </form>
  )
}