import React from 'react';
import { ListItem } from 'src/shared/lib/api';
import { useTasks } from 'src/entities/task/use-tasks';

import { cn } from 'src/shared/lib/css';
import { TodoItem } from '../todo-item/todo-item';
import styles from './todo-list.module.css';

type TodoListProps = React.HTMLAttributes<HTMLDivElement> & {
	taskId: string;
	tasksPromise: Promise<ListItem[] | undefined>;
	refetchTasks: () => void;
};

export function TodoList({
	taskId,
	tasksPromise,
	refetchTasks,
	...props
}: TodoListProps) {
	const { useTasksList } = useTasks();
	const tasks = useTasksList(tasksPromise);
	const findedTask = tasks?.find((task) => task.id === taskId);

	return (
		<section
			className={cn(styles.wrapper, {
				[styles.empty]: !findedTask,
			})}
			{...props}
		>
			{tasks?.length === 0 && (
				<h2 className={styles.title}>Задачи отсутствуют</h2>
			)}
			{taskId === 'all-todos' ? (
				<>
					{tasks?.map((task) => (
						<div key={task.id}>
							<TodoItem task={task} refetchTasks={refetchTasks} />
						</div>
					))}
				</>
			) : (
				<>
					{!findedTask ? (
						<></>
					) : (
						<div>
							<TodoItem task={findedTask} refetchTasks={refetchTasks} />
						</div>
					)}
				</>
			)}
		</section>
	);
}
