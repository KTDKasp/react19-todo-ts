import React from 'react';
import { Button } from '../button/button';
import CloseIcon from 'src/assets/cancel.svg?react';
import styles from './add-folder-form.module.css';
import { ColorItem } from 'src/shared/lib/api';
import { useColors } from 'src/entities/task-color/use-colors';
import { cn } from 'src/shared/lib/css';
import { addFolder } from './actions';

type AddFolderFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onClose: () => void;
	taskColors: Promise<ColorItem[] | undefined>;
	refetchTasks: () => void;
	ref?: React.Ref<HTMLInputElement>;
};

export function AddFolderForm({
	onClose,
	taskColors,
	refetchTasks,
	ref,
	className,
	tabIndex,
	...props
}: AddFolderFormProps) {
	const { useColorsList } = useColors();
	const cololsList = useColorsList(taskColors);
	const [color, setColor] = React.useState('');

	const [state, formAction, isPending] = React.useActionState(
		addFolder(refetchTasks),
		undefined
	);

	return (
		<form className={cn(styles.form, className)} {...props}>
			<input
				ref={ref}
				className={styles.input}
				type="text"
				placeholder="Название папки"
				tabIndex={tabIndex}
				name="title"
			/>
			<div className={styles.colors}>
				{cololsList?.map((colorItem) => (
					<label className={styles.label} key={colorItem.id}>
						<input
							className={styles['radio-color']}
							type="radio"
							name="color"
							value={colorItem.id}
							checked={color === colorItem.id}
							onChange={(e) => setColor(e.target.value)}
						/>
						<span
							className={cn(styles['custom-radio'], styles[colorItem.name])}
						></span>
					</label>
				))}
			</div>
			<Button
				tabIndex={tabIndex}
				disabled={isPending}
				type="submit"
				color="green"
				formAction={(e) => {
					setColor('');
					formAction(e);
				}}
			>
				{isPending ? 'Загрузка...' : 'Добавить'}
			</Button>
			{state?.status === 'error' && (
				<span className={styles.error}>{state.message}</span>
			)}
			<button
				tabIndex={tabIndex}
				type="button"
				aria-label="Close form button"
				className={styles.close}
				onClick={onClose}
			>
				<CloseIcon />
			</button>
		</form>
	);
}
