import { startTransition } from 'react';
import { editTodo } from 'src/shared/lib/api';

export function editTodoAction(refetchTasks: () => void) {
  return async function (prevState: unknown, formData: FormData) {
    try {
      const todo = formData.get('edit-todo') as string;
      const todoId = formData.get('todo-id') as string;

      startTransition(async () => {
        await editTodo(todoId, todo);
        startTransition(() => {
          refetchTasks();
        });
      });
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
