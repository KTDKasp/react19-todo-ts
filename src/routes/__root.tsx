import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';
import { AddFolderForm, Button, FolderList, TodoSidebar } from 'src/shared/ui';

import styles from '../pages/todo/todo.module.css';
import { cn } from 'src/shared/lib/css';
import { useTodo } from 'src/helpers';

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	const {
		defaultColorsPromise,
		handleClick,
		isOpened,
		onClickTask,
		onClose,
		refetchTasks,
		selectedTask,
		tasksPromise,
		formInputRef,
		tasks,
	} = useTodo();

	return (
		<div className="app">
			<div className={styles.todo}>
				<TodoSidebar>
					{tasks?.length !== 0 && (
						<Link to='/'>
						<Button
							icon="list"
							color={selectedTask === 'all-todos' ? 'white' : 'ghost'}
							onClick={() => onClickTask('all-todos')}
						>
							Все задачи
						</Button></Link>
					)}
					{tasks?.length !== 0 && (
						<Suspense fallback={<div>Загрузка...</div>}>
							<FolderList
								selectedTask={selectedTask}
								setSelectedTask={onClickTask}
								tasksPromise={tasksPromise}
								refetchTasks={refetchTasks}
							/>
						</Suspense>
					)}
					<Button onClick={handleClick} icon="add">
						Добавить папку
					</Button>
					<AddFolderForm
						refetchTasks={refetchTasks}
						className={cn({
							[styles.open]: isOpened,
							[styles.close]: !isOpened,
						})}
						tabIndex={isOpened ? 0 : -1}
						ref={formInputRef}
						taskColors={defaultColorsPromise}
						onClose={onClose}
					/>
				</TodoSidebar>
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</div>
	);
}
