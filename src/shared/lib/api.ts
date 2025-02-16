export type ListItem = {
  id: string
  name: string;
  colorId: number;
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