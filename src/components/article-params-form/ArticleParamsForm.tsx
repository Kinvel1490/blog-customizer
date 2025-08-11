import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormPropsType = {
	children: React.ReactNode | React.ReactNode[] | null;
	actions?: {
		onSubmit?: (e: React.MouseEvent) => void;
		onReset?: () => void;
	};
};

export const ArticleParamsForm = (props: ArticleParamsFormPropsType) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					{props.children}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={props.actions?.onReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={props.actions?.onSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
