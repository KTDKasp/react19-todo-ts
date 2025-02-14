import React from "react";
import styles from "./sidebar.module.css";
import { cn } from "../../lib/css";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
}

export function Sidebar({ children, ...props }: SidebarProps) {
	return (
		<div className={cn(styles.sidebar, {
			[styles.open]: true
		})} {...props}>
			{children}
		</div>
	)
}