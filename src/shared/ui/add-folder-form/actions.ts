import { startTransition } from 'react';
import { addTask } from 'src/shared/lib/api';

export function addFolder(
	refetchTasks: () => void,
) {
	return async function (_: unknown, formData: FormData) {
		const name = formData.get('title') as string;
		const colorId = formData.get('color') as string;

		if (!name || !colorId) {
			return {
				status: 'error',
				message: 'Заполните поле ввода и выберите цвет',
			};
		}

		try {
			startTransition(async () => {
				await addTask(name, colorId);
				startTransition(() => {
					refetchTasks();
				});
			});

			return {
				status: 'success',
				message: 'Папка успешно создана',
			};
		} catch {
			return {
				status: 'error',
				message: 'Что-то пошло не так, попробуйте еще раз',
			};
		}
	};
}
