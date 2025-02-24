import {
	AddFolderForm,
	Button,
	FolderList,
	TodoList,
	TodoSidebar,
} from 'src/shared/ui';
import styles from './todo.module.css';
import { fetchColors, fetchList } from 'src/shared/lib/api';
import { Suspense, useRef, useState } from 'react';
import { cn } from 'src/shared/lib/css';

const defaultListPromise = fetchList();
const defaultColorsPromise = fetchColors();

export function Todo() {
	const [tasksPromise, setTasksPromise] = useState(defaultListPromise);
	const [isOpened, setIsOpened] = useState(false);
	const [selectedTask, setSelectedTask] = useState<string>('all-todos');

	const formInputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		setIsOpened(true);
		formInputRef.current?.focus();
	};

	const refetchTasks = () => {
		setTasksPromise(fetchList());
	};

	return (
		<div className={styles.todo}>
			<TodoSidebar>
				<Button
					icon="list"
					color={selectedTask === 'all-todos' ? 'white' : 'ghost'}
					onClick={() => setSelectedTask('all-todos')}
				>
					Все задачи
				</Button>
				<Suspense fallback={<div>Загрузка...</div>}>
					<FolderList
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
						tasksPromise={tasksPromise}
						refetchTasks={refetchTasks}
					/>
				</Suspense>
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
					onClose={() => setIsOpened(false)}
				/>
			</TodoSidebar>
			<TodoList
				taskId={selectedTask}
				tasksPromise={tasksPromise}
				refetchTasks={refetchTasks}
			/>
		</div>
	);
}
