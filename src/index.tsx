import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from './constants/articleProps';
import { Select } from './ui/select';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Separator } from './ui/separator';
import { Spacer } from './ui/spacer';
import { Text } from './ui/text';
import { RadioGroup } from './ui/radio-group';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);
	const [formState, setFormState] = useState(defaultArticleState);

	function handleOnSubmit(e: React.MouseEvent) {
		e.preventDefault();
		setAppState({
			...formState,
		});
	}

	function handleReset() {
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
	}

	function setParameters(param: Partial<ArticleStateType>) {
		setFormState({
			...formState,
			...param,
		});
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				actions={{
					onSubmit: handleOnSubmit,
					onReset: handleReset,
				}}>
				<Text weight={800} size={31} uppercase>
					Задайте параметры
				</Text>
				<Spacer />
				<Text weight={800} size={12} uppercase>
					Шрифт
				</Text>
				<Select
					options={fontFamilyOptions}
					selected={formState.fontFamilyOption}
					onChange={(fontOption: OptionType) => {
						setParameters({ fontFamilyOption: fontOption });
					}}
				/>
				<Spacer />
				<RadioGroup
					title='Размер шрифта'
					options={fontSizeOptions}
					selected={formState.fontSizeOption}
					name='fontSizeOptions'
					onChange={(fontSizeOption: OptionType) => {
						setParameters({ fontSizeOption: fontSizeOption });
					}}
				/>
				<Spacer />
				<Text weight={800} size={12} uppercase>
					Цвет шрифта
				</Text>
				<Select
					options={fontColors}
					selected={formState.fontColor}
					onChange={(fontColor: OptionType) => {
						setParameters({ fontColor: fontColor });
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
					selected={formState.backgroundColor}
					onChange={(backgroundColor: OptionType) => {
						setParameters({ backgroundColor: backgroundColor });
					}}
				/>
				<Spacer />
				<Text weight={800} size={12} uppercase>
					Ширина контента
				</Text>
				<Select
					options={contentWidthArr}
					selected={formState.contentWidth}
					onChange={(contentWidth: OptionType) => {
						setParameters({ contentWidth: contentWidth });
					}}
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
