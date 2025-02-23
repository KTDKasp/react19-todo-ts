import { use, useContext } from "react";
import { TodoContext } from "./context"

export const useTodo = () => {
	const todoContext = useContext(TodoContext);
	if (!todoContext) throw new Error("useTodo must be used within TodoProvider");

	const tasks = use(todoContext.tasksPromise)
	return {
		...todoContext,
		tasks
	};
}