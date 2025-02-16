import { use } from "react";
import { ColorItem } from "src/shared/lib/api";

export function useColors() {
	const useColorsList = (taskPromise: Promise<ColorItem[] | undefined>) => {
		const colors = use(taskPromise);
		return colors
	}

	return {
		useColorsList
	} as const;
}
