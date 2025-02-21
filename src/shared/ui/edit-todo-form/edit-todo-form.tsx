import React from 'react';
import { Button } from '../button/button';
import { cn } from 'src/shared/lib/css';
import { editTodoAction } from './actions';

import styles from './edit-todo-form.module.css';

type EditTodoFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onClose: () => void;
  todoId: string;
  refetchTasks: () => void;
  defaultText: string;
	ref?: React.Ref<HTMLInputElement>;
};

export function EditTodoForm({ ref, todoId, defaultText, onClose, refetchTasks, className, ...props }: EditTodoFormProps) {

  const [state, formAction, isPending] = React.useActionState(editTodoAction(refetchTasks), undefined);

	return (
		<form className={cn(styles.form, className)} {...props}>
			<input
				name="edit-todo"
				ref={ref}
				placeholder='Текст задачи'
				className={styles.input}
				type="text"
        defaultValue={defaultText}
			/>
      <input type="hidden" name="todo-id" value={todoId} />
			<div className={styles.actions}>
				<Button disabled={isPending} color="green" formAction={(e) => {
          formAction(e);
          onClose();
        }}>{isPending ? "Изменить..." : "Изменить задачу"}</Button>
				<Button type='button' disabled={isPending} color="grey" onClick={onClose}>
					Отмена
				</Button>
			</div>
      {state?.status === "error" && <div className={styles.error}>{state.message}</div>}
		</form>
	);
}
