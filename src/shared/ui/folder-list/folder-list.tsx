import React from 'react';
import DeleteIcon from 'src/assets/delete.svg?react';
import MarkerIcon from 'src/assets/marker.svg?react';
import styles from './folder-list.module.css';
import { cn } from 'src/shared/lib/css';
import { ListItem } from 'src/shared/lib/api';
import { useTasks } from 'src/entities/task/use-tasks';

const color = 'green';

type FolderListProps = React.HTMLAttributes<HTMLUListElement> & {
  tasksPromise: Promise<ListItem[] | undefined>;
};

export function FolderList({ tasksPromise, ...props }: FolderListProps) {
  const { useTasksList } = useTasks();
  const tasks = useTasksList(tasksPromise);

  return (
    <ul className={styles['folder-list']} {...props}>
      {tasks?.map((task) => (
        <li key={task.id} className={cn(styles['list-element'])}>
          <MarkerIcon className={styles[color]} />
          <span className={styles.title}>{task.name}</span>
          <button className={styles.delete} aria-label="Delete">
            <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
