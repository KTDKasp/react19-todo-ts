import React from 'react';
import { Button } from '../button/button';

import styles from './add-todo-form.module.css';
import { addTodoAction } from './actions';
import { cn } from 'src/shared/lib/css';

type AddTodoFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onClose: () => void;
  listId: string;
  refetchTasks: () => void;
	ref?: React.Ref<HTMLInputElement>;
};

export function AddTodoForm({ ref, listId, onClose, refetchTasks, className, ...props }: AddTodoFormProps) {

  const [state, formAction, isPending] = React.useActionState(addTodoAction(refetchTasks), undefined);

	return (
		<form className={cn(styles.form, className)} {...props}>
			<input
				name="title"
				ref={ref}
				placeholder='Текст задачи'
				className={styles.input}
				type="text"
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
