import { startTransition } from "react";
import { editTaskTitle } from "src/shared/lib/api";

export function editTitle(refetchTasks: () => void) {
  return async function(prevState: unknown, formData: FormData) {
    const title = formData.get("task") as string;
    const taskId = formData.get("taskId") as string;
    if (!title.trim()) {
      return {
        status: "error",
        message: "Поле не должно быть пустым" 
      }
    }

    try {
      startTransition(async () => {
        await editTaskTitle(taskId, title);
        startTransition(() => {
          refetchTasks();
        })
      })

      return {
				status: 'success',
				message: 'Название успешно изменено',
			};
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        return {
          status: "error",
          message: "Что-то пошло не так, попробуйте еще раз"
        }
      }
    }
  }
}