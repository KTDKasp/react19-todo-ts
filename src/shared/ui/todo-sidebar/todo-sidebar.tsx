import React from "react";
import styles from "./todo-sidebar.module.css";
import { cn } from "src/shared/lib/css";

type TodoSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
}

export function TodoSidebar({ children, ...props }: TodoSidebarProps) {
	return (
		<div className={cn(styles.sidebar, {
			[styles.open]: true
		})} {...props}>
			{children}
		</div>
	)
}