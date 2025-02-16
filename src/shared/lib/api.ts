export type ListItem = {
  id: string
  name: string;
  colorId: number;
}

export type ColorItem = {
  id: string;
  hex: string;
  name: string;
}

export async function fetchList(): Promise<ListItem[] | undefined> {
  try {
    const res = await fetch(`${import.meta.env.VITE_DB_URL}/lists`);

    if (!res.ok) {
      throw new Error("Error in fetching task list, try again");
    }

    return res.json() as Promise<ListItem[]>
  } catch (error) {
    if (error instanceof Error) {
      console.error(error, error.message)
    }
  }
}

export async function fetchColors(): Promise<ColorItem[] | undefined> {
  try {
    const res = await fetch(`${import.meta.env.VITE_DB_URL}/colors`);

    if (!res.ok) {
      throw new Error("Error in fetching color list, try again");
    }

    return res.json() as Promise<ColorItem[]>
  } catch (error) {
    if (error instanceof Error) {
      console.error(error, error.message)
    }
  }
}