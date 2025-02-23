import { createLazyFileRoute } from '@tanstack/react-router';
import { useTodo } from 'src/helpers';
import { TodoList } from 'src/shared/ui';

export const Route = createLazyFileRoute('/')({
	component: Index,
	pendingComponent: () => (
		<div
			style={{
				fontSize: '32px',
				lineHeight: '40px',
				fontWeight: '700',
        color: "#c3c3c3",
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
			}}
		>
			Загрузка...
		</div>
	),
});

function Index() {
	const { selectedTask, tasksPromise, refetchTasks } = useTodo();

	return (
		<TodoList
			taskId={selectedTask}
			tasksPromise={tasksPromise}
			refetchTasks={refetchTasks}
		/>
	);
}
