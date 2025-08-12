import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, SyntheticEvent } from 'react';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Spacer } from '../../ui/spacer';
import { Text } from '../../ui/text';
import { RadioGroup } from '../../ui/radio-group';
import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import { useOutsideClickClose } from './useOutsideClickClose';

type ArticleParamsFormPropsType = {
	articleState: ArticleStateType;
	actions: {
		onSubmit?: (e: SyntheticEvent) => void;
		onReset?: () => void;
		onChange: (option: Partial<ArticleStateType>) => void;
	};
};

export const ArticleParamsForm = (props: ArticleParamsFormPropsType) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const {
		fontFamilyOption,
		fontSizeOption,
		backgroundColor,
		fontColor,
		contentWidth,
	} = props.articleState;
	const onChangeParameter = props.actions.onChange;
	const rootRef = useRef(null);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	useOutsideClickClose({ isOpen: isMenuOpen, onClose: toggleMenu, rootRef });

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					ref={rootRef}
					onSubmit={props.actions.onSubmit}
					onReset={props.actions.onReset}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Spacer />
					<Text weight={800} size={12} uppercase>
						Шрифт
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={(fontOption: OptionType) => {
							onChangeParameter({ fontFamilyOption: fontOption });
						}}
					/>
					<Spacer />
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOption}
						name='fontSizeOptions'
						onChange={(fontSizeOption: OptionType) => {
							onChangeParameter({ fontSizeOption: fontSizeOption });
						}}
					/>
					<Spacer />
					<Text weight={800} size={12} uppercase>
						Цвет шрифта
					</Text>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={(fontColor: OptionType) => {
							onChangeParameter({ fontColor: fontColor });
						}}
					/>
					<Spacer />
					<Separator />
					<Spacer />
					<Text weight={800} size={12} uppercase>
						Цвет фона
					</Text>
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={(backgroundColor: OptionType) => {
							onChangeParameter({ backgroundColor: backgroundColor });
						}}
					/>
					<Spacer />
					<Text weight={800} size={12} uppercase>
						Ширина контента
					</Text>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={(contentWidth: OptionType) => {
							onChangeParameter({ contentWidth: contentWidth });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
