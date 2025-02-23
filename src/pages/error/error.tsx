import { Link } from "@tanstack/react-router";
import styles from "./error.module.css";

export function ErrorPage({children}: {children: React.ReactNode}) {
	return (
		<div className={styles.error}>
			<h1 className={styles.title}>Что-то пошло не так</h1>
			<Link to="/" className={styles.link}>Вернуться на главную</Link>
			<h2>
				{children}
			</h2>
		</div>
	)
}