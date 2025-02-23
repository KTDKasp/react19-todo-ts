import { useRef, useState } from 'react';
import { fetchColors, fetchList } from 'src/shared/lib/api';
import { TodoContext } from './context';

const defaultListPromise = fetchList();
const defaultColorsPromise = fetchColors();

export function TodoProvider({ children }: { children: React.ReactNode }) {
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

	const onClose = () => {
		setIsOpened(false);
	};

	const onClickTask = (taskId: string) => {
		setSelectedTask(taskId);
	};

	return (
		<TodoContext.Provider
			value={{
				tasksPromise,
				isOpened,
				defaultColorsPromise,
				selectedTask,
				handleClick,
				refetchTasks,
				onClose,
				onClickTask,
				formInputRef
			}}
		>
			{children}
		</TodoContext.Provider>
	);
}
