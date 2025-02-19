import React from 'react';
import { Button } from '../button/button';

import styles from './add-todo-form.module.css';
import { addTodoAction } from './actions';

type AddTodoFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onClose: () => void;
  listId: string;
  refetchTasks: () => void;
	ref?: React.Ref<HTMLInputElement>;
};

export function AddTodoForm({ ref, listId, onClose, refetchTasks, ...props }: AddTodoFormProps) {
	const [todo, setTodo] = React.useState('');

  const [state, formAction, isPending] = React.useActionState(addTodoAction(refetchTasks, setTodo), undefined);

	return (
		<form className={styles.form} {...props}>
			<input
				name="title"
				ref={ref}
				placeholder='Текст задачи'
				className={styles.input}
				type="text"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
      <input type="hidden" name="listId" value={listId} />
			<div className={styles.actions}>
				<Button disabled={isPending} color="green" formAction={(e) => {
          formAction(e);
          onClose();
        }}>{isPending ? "Добавляю..." : "Добавить задачу"}</Button>
				<Button type='button' disabled={isPending} color="grey" onClick={onClose}>
					Отмена
				</Button>
			</div>
      {state?.status === "error" && <div className={styles.error}>{state.message}</div>}
		</form>
	);
}
