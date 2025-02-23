import { ColorItem, ListItem } from "src/shared/lib/api";
import { createContext, Ref } from "react";

type TodoContextType = {
	tasksPromise: Promise<ListItem[] | undefined>;
	isOpened: boolean;
	defaultColorsPromise: Promise<ColorItem[] | undefined>;
	selectedTask: string;
	handleClick: () => void;
	refetchTasks: () => void;
	onClose: () => void;
	onClickTask: (taskId: string) => void;
	formInputRef: Ref<HTMLInputElement>
};

export const TodoContext = createContext<TodoContextType | null>(null);