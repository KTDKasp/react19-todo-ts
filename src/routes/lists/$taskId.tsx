import { createFileRoute } from '@tanstack/react-router';
import { useTodo } from 'src/helpers';
import { ErrorPage } from 'src/pages';
import { fetchTask, ListItem } from 'src/shared/lib/api';
import { cn } from 'src/shared/lib/css';
import { TodoItem } from 'src/shared/ui';

import styles from '../../shared/ui/todo-list/todo-list.module.css';

export const Route = createFileRoute('/lists/$taskId')({
	component: RouteComponent,
	loader: ({ params }) => fetchTask(params.taskId),
	errorComponent: ({ error }) => <ErrorPage>Ошибка: {error.message}</ErrorPage>,
});

function RouteComponent() {
	const { refetchTasks } = useTodo();
	const data = Route.useLoaderData() as ListItem | undefined;
  if (!data) {
    throw new Error('Task not found');
  }
	return (
		<section
			className={cn(styles.wrapper, {
				[styles.empty]: !data,
			})}
		>
			{!data ? <>asdsa</> : <TodoItem task={data} refetchTasks={refetchTasks} />}
		</section>
	);
}
