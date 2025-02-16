import { use } from "react";
import { ListItem } from "src/shared/lib/api";

export function useTasks() {
  const useTasksList = (taskPromise: Promise<ListItem[] | undefined>) => {
    const tasks = use(taskPromise);
    return tasks
  }

  return {
    useTasksList
  } as const;
}
