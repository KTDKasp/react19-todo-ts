import React from 'react';
import { Button } from '../button/button';
import CancelIcon from 'src/assets/cancel.svg?react';
import styles from './add-folder-form.module.css';
import { ColorItem } from 'src/shared/lib/api';
import { useColors } from 'src/entities/task-color/use-colors';

type AddFolderFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onClose: () => void;
	taskColors: Promise<ColorItem[] | undefined>;
};

export function AddFolderForm({
	onClose,
	taskColors,
	...props
}: AddFolderFormProps) {
	const { useColorsList } = useColors();
	const cololsList = useColorsList(taskColors);
	
	const [color, setColor] = React.useState('');

	return (
		<form {...props} className={styles.form}>
			<input
				className={styles.input}
				type="text"
				placeholder="Название папки"
			/>
			<div className={styles.colors}>
				{cololsList?.map((colorItem) => (
					<input
						key={colorItem.id}
						type="radio"
						name="color"
						value={colorItem.name}
						checked={color === colorItem.name}
						onChange={(e) => setColor(e.target.value)}
					/>
				))}
			</div>
			<Button type="button" color="green">
				Добавить
			</Button>
			<button type="button" className={styles.close} onClick={onClose}>
				<CancelIcon />
			</button>
		</form>
	);
}
