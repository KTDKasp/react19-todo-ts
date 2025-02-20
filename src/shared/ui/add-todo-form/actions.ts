import { startTransition } from 'react';
import { addTodo } from 'src/shared/lib/api';

export function addTodoAction(
	refetchTasks: () => void,
) {
	return async function (prevState: unknown, formData: FormData) {
		const title = formData.get('title') as string;
		const listId = formData.get('listId') as string;

		if (!title) {
			return {
				status: 'error',
				message: 'Заполните поле ввода',
			};
		}

		try {
			startTransition(async () => {
				await addTodo(title, listId);
				startTransition(() => {
					refetchTasks();
				});
			});

			return {
				status: 'success',
				message: 'Задача успешно создана',
			};
		} catch (e) {
			if (e instanceof Error) {
				return {
					status: 'error',
					message: `Что-то пошло не так, попробуйте еще раз: ${e.message}`,
				};
			}
		}
	};
}
