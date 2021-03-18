import React, { useEffect, useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import CheckboxItemTarget from '../components/CheckboxItemTarget';
import bridge from '@vkontakte/vk-bridge';

const STORAGE_KEYS = {
	STATE: 'state',
	STATUS: 'saved',
};

const achivmentsStatic = [
	{emoji: "f09f91b6", text: "Родиться"},
	{emoji: "f09f9ab6", text: "Сделать первые шаги"},
	{emoji: "f09f93a3", text: "Сказать первое слово"},
	{emoji: "f09f91a8e2808df09f8fab", text: "Научиться читать"},
	{emoji: "f09fa497", text: "Найти настоящего друга" },
	{emoji: "f09f9ab4", text: "Научиться кататься на велосипеде"},
	{emoji: "f09f9397", text: "Прочитать книгу"},
	{emoji: "f09f8f8a", text: "Научиться плавать"},
	{emoji: "f09f8fab", text: "Закончить начальную школу"},
	{emoji: "e29abd", text: "Заняться спортом"},
	{emoji: "f09f9bab", text: "Полетать на самолёте"},
	{emoji: "f09f9ba5", text: "Покататься на лодке"},
	{emoji: "f09f9a86", text: "Покататься на поезде"},
	{emoji: "f09f9a81", text: "Полетать на вертолёте"},
	{emoji: "f09f8c8a", text: "Посмотреть на океан"},
	{emoji: "e29d84", text: "Увидеть снег"},
	{emoji: "e29883", text: "Сделать снеговика"},
	{emoji: "f09f8fab", text: "Закончить среднюю школу"},
	{emoji: "f09f8eb6", text: "Сходить на концерт"},
	{emoji: "f09f8f95", text: "Сходить в поход"},
	{emoji: "f09f8ea2", text: "Покататься на роликах"},
	{emoji: "f09f8ebb", text: "Научиться играть на музыкальном инструменте"},
	{emoji: "f09f928b", text: "Поцеловаться"},
	{emoji: "f09f92b3", text: "Получить кредитную карту"},
	{emoji: "f09f9a98", text: "Научиться водить"},
	{emoji: "f09f97ba", text: "Отправиться в путешествие"},
	{emoji: "f09f97be", text: "Посетить другую страну"},
	{emoji: "f09f8ea4", text: "Научиться говорить скороговорки"},
	{emoji: "f09f8fab", text: "Закончить старшую школу"},
	{emoji: "f09f8c90", text: "Выучить иностранный язык"},
	{emoji: "f09f92b8", text: "Инвестировать деньги"},
	{emoji: "f09f93b7", text: "Встретить кумира"},
	{emoji: "f09f98a9", text: "Совершить ужасную ошибку"},
	{emoji: "f09f8f86", text: "Выиграть кубок"},
	{emoji: "e29bb0", text: "Залезть на гору"},
	{emoji: "f09f8ebd", text: "Пробежать марафон"},
	{emoji: "f09f8db3", text: "Научиться готовить"},
	{emoji: "f09f94a6", text: "Исследовать пещеру"},
	{emoji: "f09f8c8b", text: "Увидеть вулкан"},
	{emoji: "f09f8e93", text: "Получить высшее образование"},
	{emoji: "f09f9295", text: "Пробыть в долгих отношениях"},
	{emoji: "f09f9791", text: "Расстаться"},
	{emoji: "f09f968a", text: "Подписать договор"},
	{emoji: "f09f8fa2", text: "Найти работу"},
	{emoji: "e2989d", text: "Получить повышение"},
	{emoji: "f09f92b5", text: "Получить первую зарплату"},
	{emoji: "f09f94a5", text: "Уволиться"},
	{emoji: "f09f93b0", text: "Попасть в новости"},
	{emoji: "f09f97b3", text: "Проголосовать на выборах"},
	{emoji: "f09fa4a1", text: "Сменить карьеру"},
	{emoji: "f09f8fa0", text: "Купить дом"},
	{emoji: "f09f928d", text: "Обручиться"},
	{emoji: "f09f91b0", text: "Пожениться / Выйти замуж"},
	{emoji: "f09f91b6", text: "Завести ребёнка"},
	{emoji: "f09f9ab6", text: "Научить ребёнка ходить"},
	{emoji: "f09f93a3", text: "Научить ребёнка говорить"},
	{emoji: "f09f8e93", text: "Побыть на выпускном ребёнка"},
	{emoji: "f09f91b0", text: "Побыть на свадьбе ребёнка"},
	{emoji: "f09f91b4", text: "Стать дедушкой / бабушкой"},
	{emoji: "f09f8f96", text: "Выйти на пенсию"},
	{emoji: "f09f9394", text: "Рассказать внукам историю"},
	{emoji: "f09f8c91", text: "Посмотреть солнечное затмение"},
	{emoji: "f09f8cb7", text: "Посадить дерево"},
	{emoji: "f09f8c8e", text: "Путешествовать по миру"},
	{emoji: "f09f8e82", text: "Отпраздновать 100-летие"},
	{emoji: "e29c94", text: "Завершить чек-лист"}
]


const Home = ({ id }) => {
	
	async function loadData() {
		const achivmentsState = await bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEYS.STATE, STORAGE_KEYS.STATUS]});
		const dataCache = JSON.parse(achivmentsState.keys[1].value)
		achivmentsState.keys[1].value ? setAchivment(dataCache.achivments) : setAchivment(achivmentsStatic)
	}
	
	const [isLoaded, setLoaded] = useState(false)

	const [achivments, setAchivment] = useState(achivmentsStatic.map(item => ({checked: false})))

	const howManyChecked = (achivments) => {
		const howMany = achivments.filter((item) => item.checked)
		return howMany.length
	}

	useEffect(() => {
		loadData()
		setLoaded(true)
	}, [])

	return (
	<Panel id={id}>
		<PanelHeader>
			Life Checklist
		</PanelHeader>
		{isLoaded && (
		<React.Fragment>
			<FixedLayout vertical="top" filled={true}>
				<Group>
					<Div>
					<InfoRow header={`Из ${achivments.length} пунктов ты выполнил(а) ${howManyChecked(achivments)}`}>
						<Progress value={100 / achivments.length * howManyChecked(achivments)} />
					</InfoRow>
					</Div>
				</Group>
			</FixedLayout>
			<Div style={{ paddingTop: 60, paddingBottom: 60, color: 'gray' }}>
				{achivmentsStatic.map((item, index) => {
					return (
						<CheckboxItemTarget
							key={item.text}
							data={item}
							isChecked={achivments[index].checked}
							setChecked={() => {
								const newChecked = [...achivments]
								newChecked[index].checked = !newChecked[index].checked
								bridge.send('VKWebAppStorageSet', {
									key: STORAGE_KEYS.STATUS,
									value: JSON.stringify({
										achivments: newChecked,
									}),
								});
								setAchivment(newChecked)
							}}
						/>
					)
				})}
			</Div>
		</React.Fragment>
		)}
	</Panel>
	)
}



export default Home;
