import React from 'react';
import DeleteIcon from "src/../public/delete.svg?react";
import MarkerIcon from "src/../public/marker.svg?react";
import styles from './folder-list.module.css';
import { cn } from 'src/shared/lib/css';

const color = "green";

type FolderListProps = React.HTMLAttributes<HTMLUListElement> & {};

export function FolderList({ ...props }: FolderListProps) {
  return (
    <ul className={styles["folder-list"]} {...props}>
      <li className={cn(styles["list-element"], styles.active)}>
        <MarkerIcon className={styles[color]} />
        <span className={styles.title}>Frontend</span>
        <button className={styles.delete} aria-label='Delete'><DeleteIcon /></button>
      </li>
      <li className={cn(styles["list-element"])}>
        <MarkerIcon className={styles[color]} />
        <span className={styles.title}>Frontend</span>
        <button className={styles.delete} aria-label='Delete'><DeleteIcon /></button>
      </li>
    </ul>
  );
}
