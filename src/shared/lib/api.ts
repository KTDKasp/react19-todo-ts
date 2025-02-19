export type ColorItem = {
  id: string;
  hex: string;
  name: string;
}

export type TodoItem = {
  listId: string,
  text: string,
  completed: boolean,
  id: string
}

export type ListItem = {
  id: string
  name: string;
  colorId: string;
  color: ColorItem
  todos: TodoItem[];
}

export async function fetchList(): Promise<ListItem[] | undefined> {
  try {
    const res = await fetch(`${import.meta.env.VITE_DB_URL}/lists?_embed=color&_embed=todos`);

    if (!res.ok) {
      throw new Error("Error in fetching task list, try again");
    }

    return res.json() as Promise<ListItem[]>
  } catch (error) {
    if (error instanceof Error) {
      console.error(error, error.message);
    }
  }
}

export async function addTask(name: string, colorId: string): Promise<ListItem | undefined> {
  try {
    const res = await fetch(`${import.meta.env.VITE_DB_URL}/lists`, {
      method: "POST",
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name,
        colorId
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    if (!res.ok) {
      throw new Error("Error in creating task, try again");
    }

    return res.json() as Promise<ListItem>
  } catch (error) {
    if (error instanceof Error) {
      console.error(error, error.message)
    }
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    await fetch(`${import.meta.env.VITE_DB_URL}/lists/${id}`, {
      method: "DELETE"
    })
  } catch (e) {
    if (e instanceof Error) {
      console.error(e, e.message)
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

export async function addTodo(name: string, listId: string): Promise<TodoItem | undefined> {
  try {
    const res = await fetch(`${import.meta.env.VITE_DB_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        id: crypto.randomUUID(),
        text: name,
        listId,
        completed: false
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
  
    if (!res.ok) {
      throw new Error("Error in creating task, try again");
    }
  
    return res.json() as Promise<TodoItem>
  } catch (error) {
    if (error instanceof Error) {
      console.error(error, error.message);
    }
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    await fetch(`${import.meta.env.VITE_DB_URL}/todos/${id}`, {
      method: "DELETE"
    })
  } catch(e) {
    if (e instanceof Error) {
      console.error(e, e.message)
    }
  }
}