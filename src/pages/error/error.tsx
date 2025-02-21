import { Link } from "react-router";

import styles from "./error.module.css";

export function ErrorPage() {
	return (
		<div className={styles.error}>
			<h1 className={styles.title}>Что-то пошло не так</h1>
			<Link to="/" className={styles.link}>Вернуться на главную</Link>
		</div>
	)
}