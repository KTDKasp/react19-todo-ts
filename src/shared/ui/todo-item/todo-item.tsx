import EditIcon from 'src/assets/edit.svg?react';
import DeleteIcon from 'src/assets/delete.svg?react';
import CheckIcon from 'src/assets/check.svg?react';
import PlusIcon from 'src/assets/plus.svg?react';

import { AddTodoForm } from '../add-todo-form/add-todo-form';

import styles from './todo-item.module.css';
import React from 'react';
import { deleteTodo, ListItem } from 'src/shared/lib/api';
import { cn } from 'src/shared/lib/css';

type TodoItemProps = { 
	task: ListItem; 
	refetchTasks: () => void;
};

export function TodoItem({ task, refetchTasks }: TodoItemProps) {
	const [isTodoFormOpened, setIsTodoFormOpened] = React.useState(false);
	const inputTodoRef = React.useRef<HTMLInputElement>(null);

	const handleClick = () => {
		setIsTodoFormOpened(true);
		inputTodoRef.current?.focus();
	};

	const handleDelete = (id: string) => {
		React.startTransition(async () => {
			await deleteTodo(id);
			React.startTransition(() => {
				refetchTasks();
			});
		});
	};

	return (
		<>
			<div className={styles.header}>
				<h2 className={styles.title} style={{ color: task?.color.hex }}>
					{task?.name}
				</h2>
				<EditIcon className={styles.icon} />
			</div>
			<hr className={styles.divider} />
			{task.todos.length !== 0 && (
				<div className={styles['todo-list']}>
					{task.todos.map((todo) => (
						<div className={styles['todo-block']} key={todo.id}>
							<label className={styles.todo} htmlFor={todo.id}>
								<input
									className={styles['real-check']}
									type="checkbox"
									name="todo"
									value={todo.id}
									id={todo.id}
									checked={todo.completed}
								/>
								<span className={styles['custom-check']}>
									<CheckIcon className={styles.check} />
								</span>
								<span className={styles.text}>{todo.text}</span>
							</label>
							<div className={styles.actions}>
								<button className={styles.action}>
									<EditIcon />
								</button>
								<button
									onClick={() => handleDelete(todo.id)}
									className={styles.action}
								>
									<DeleteIcon />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<div className={styles["add-todo-block"]}>
				
					<button onClick={handleClick} className={cn(styles['add-todo'], {
							[styles.opened]: !isTodoFormOpened,
							[styles.closed]: isTodoFormOpened,
						})}>
						<PlusIcon />
						<span>Новая задача</span>
					</button>
		
					<AddTodoForm
						refetchTasks={refetchTasks}
						listId={task.id}
						ref={inputTodoRef}
						onClose={() => setIsTodoFormOpened(false)}
						className={cn({
							[styles.opened]: isTodoFormOpened,
							[styles.closed]: !isTodoFormOpened,
						})}
					/>
	
			</div>
		</>
	);
}
