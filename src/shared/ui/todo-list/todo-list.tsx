import React from 'react';
import { ListItem } from 'src/shared/lib/api';
import { useTasks } from 'src/entities/task/use-tasks';
import EditIcon from 'src/assets/edit.svg?react';
import DeleteIcon from 'src/assets/delete.svg?react';
import CheckIcon from 'src/assets/check.svg?react';
import PlusIcon from 'src/assets/plus.svg?react';
import styles from './todo-list.module.css';
import { cn } from 'src/shared/lib/css';
import { AddTodoForm } from '../add-todo-form/add-todo-form';

type TodoListProps = React.HTMLAttributes<HTMLDivElement> & {
	taskId: string;
	tasksPromise: Promise<ListItem[] | undefined>;
};

export function TodoList({ taskId, tasksPromise, ...props }: TodoListProps) {
	const { useTasksList } = useTasks();
	const tasks = useTasksList(tasksPromise);

	const task = tasks?.find((task) => task.id === taskId);
	const [isTodoFormOpened, setIsTodoFormOpened] = React.useState(false);
	const inputTodoRef = React.useRef<HTMLInputElement>(null);

	const handleClick = () => {
		setIsTodoFormOpened(true);
		inputTodoRef.current?.focus();
	}

	return (
		<>
			{!task ? (
				<div className={cn(styles.wrapper, styles.empty)}>
					<h2 className={styles.title}>Задачи отсутствуют</h2>
				</div>
			) : (
				<section className={styles.wrapper} {...props}>
					<div className={styles.header}>
						<h2 className={styles.title} style={{ color: task?.color.hex }}>
							{task?.name}
						</h2>
						<EditIcon className={styles.icon} />
					</div>
					<hr className={styles.divider} />
					{task.todos.length !== 0 && (
						<div className={styles['todo-list']}>
							{task.todos.map(todo => (
                <div className={styles['todo-block']} key={todo.id}>
								<label className={styles.todo} htmlFor={todo.id}>
									<input
										className={styles['real-check']}
										type="checkbox"
										name="todo"
										value={todo.id}
                    checked={todo.completed}
										id={todo.id}
									/>
									<span className={styles['custom-check']}>
										<CheckIcon className={styles.check} />
									</span>
									<span className={styles.text}>
										{todo.text}
									</span>
								</label>
								<div className={styles.actions}>
									<button className={styles.action}>
										<EditIcon />
									</button>
									<button className={styles.action}>
										<DeleteIcon />
									</button>
								</div>
							</div>
              ))}
						</div>
					)}
					<button onClick={handleClick} className={styles["add-todo"]}>
						<PlusIcon />
            <span>Новая задача</span>
					</button>
					{
						isTodoFormOpened && <AddTodoForm ref={inputTodoRef} onClose={() => setIsTodoFormOpened(false)} />
					}
				</section>
			)}
		</>
	);
}
