import React, { startTransition } from 'react';
import DeleteIcon from 'src/assets/delete.svg?react';
import MarkerIcon from 'src/assets/marker.svg?react';
import { cn } from 'src/shared/lib/css';
import { deleteTask, ListItem } from 'src/shared/lib/api';
import { useTasks } from 'src/entities/task/use-tasks';
import styles from './folder-list.module.css';
import { Link } from '@tanstack/react-router';

type FolderListProps = React.HTMLAttributes<HTMLUListElement> & {
	tasksPromise: Promise<ListItem[] | undefined>;
	refetchTasks: () => void;
	selectedTask: string;
	setSelectedTask: (id: string) => void;
};

export function FolderList({
	tasksPromise,
	refetchTasks,
	selectedTask,
	setSelectedTask,
	...props
}: FolderListProps) {
	const { useTasksList } = useTasks();
	const tasks = useTasksList(tasksPromise);


	const handleDelete = (id: string) => {
		startTransition(async () => {
			await deleteTask(id);
			startTransition(() => {
				refetchTasks();
			});
		});
	};
	
	return (
		<ul className={styles['folder-list']} {...props}>
			{tasks?.map((task) => (
				<li
					key={task.id}
					onClick={() => setSelectedTask(task.id)}
				>
					<Link to="/lists/$taskId" params={{ taskId: task.id }} className={cn(styles['list-element'], {
						[styles.active]: selectedTask === task.id,
					})}>
					<MarkerIcon className={styles[task.color.name]} />
					<span className={styles.title}>{task.name}
						{
							task.todos && ` (${task.todos.length})`
						}</span>
					{selectedTask === task.id && (
						<button className={styles.delete} aria-label="Delete">
							<Link to='/'>
							<DeleteIcon onClick={() => {
								handleDelete(task.id);
							}} /></Link>
						</button>
					)}
					</Link>
				</li>
			))}
		</ul>
	);
}
