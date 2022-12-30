import { IAdvisorData, IWorkData } from "./Api";

const STUDENTS = [
    {
        FullName: 'Апельсинова Анастасия Андреевна',
        ID: 12345678,
        Year: 2017,
        Degree: 'Бакалавриат',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Бананов Борис Брониславович',
        ID: 12345679,
        Year: 2016,
        Degree: 'Магистратура',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Вишневая Виктория Витальевна',
        ID: 12345680,
        Year: 2021,
        Degree: 'Бакалавриат',
        Faculty: 'Математический',
        Finished: false
    },
    {
        FullName: 'Грушевский Георгий Георгиевич',
        ID: 12345681,
        Year: 2022,
        Degree: 'Специалитет',
        Faculty: 'Математический',
        Finished: false
    },
    {
        FullName: 'Дынный Дмитрий Денисович',
        ID: 12345682,
        Year: 2019,
        Degree: 'Бакалавриат',
        Faculty: 'Математический',
        Finished: false
    },
    {
        FullName: 'Ежевичкина Екатерина Евгеньевна',
        ID: 12345683,
        Year: 2018,
        Degree: 'Специалитет',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Жимолостева Жанна Живодраговна',
        ID: 12345684,
        Year: 2019,
        Degree: 'Магистратура',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Земляничный Захар Захарович',
        ID: 12345685,
        Year: 2017,
        Degree: 'Специалитет',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Инжиров Игнат Игоревич',
        ID: 12345686,
        Year: 2017,
        Degree: 'Бакалавриат',
        Faculty: 'Физический',
        Finished: true
    },
    {
        FullName: 'Киви Кирилл Константинович',
        ID: 12345687,
        Year: 2019,
        Degree: 'Магистратура',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Лимонова Лариса Леонидовна',
        ID: 12345688,
        Year: 2016,
        Degree: 'Бакалавриат',
        Faculty: 'ИВТ',
        Finished: true
    },
    {
        FullName: 'Манго Мария Марковна',
        ID: 12345689,
        Year: 2017,
        Degree: 'Бакалавриат',
        Faculty: 'Математический',
        Finished: true
    },
    {
        FullName: 'Нектаринков Никита Николаевич',
        ID: 12345690,
        Year: 2019,
        Degree: 'Магистратура',
        Faculty: 'ИВТ',
        Finished: true
    }
];

const DEGREES = ['Профессор', 'Доктор наук', 'Кандидат наук', 'Аспирант'];
const ADVISORS: IAdvisorData[] = [
    {
        FullName: 'Баранов Бронислав Бенедиктович',
        Degree: DEGREES[1],
        Department: 'Математического моделирования'
    },
    {
        FullName: 'Кабанчиков Константин Кузьмич',
        Degree: DEGREES[0],
        Department: 'Интересных вещей'
    },
    {
        FullName: 'Птичкина Прасковья Петровна',
        Degree: DEGREES[2],
        Department: 'Защиты информации'
    },
    {
        FullName: 'Енотова Елена Евгеньевна',
        Degree: DEGREES[3],
        Department: 'Научных технологий'
    }
]

const WORK_1 = [
    'Исследование ',
    'Изучение ',
    'Рассмотрение ',
    'Разработка ',
    'Поиск '
];

const WORK_2 = [
    'уникальных ',
    'новых ',
    'интересных ',
    'актуальных ',
    'известных '
];

const WORK_3 = [
    'решнений ',
    'свойств ',
    'признаков ',
    'особенностей ',
    'сингулярностей '
];

const WORK_4 = [
    'уравнения ',
    'задачи ',
];

const WORK_5 = [
    'Коши',
    'Лапласса',
    'Бернулли',
    'Янга Бакстера',
];
const WORK_MARK = ['Хорошо', 'Отлично', 'Удовлетворительно'];
const WORK_TYPE = ['Курсовая', 'Диплом'];
function getWorkName(seed: number, num: number): string {
    return WORK_1[(seed % (101 + num * 113)) % 5] + 
           WORK_2[(seed % (102 + num * 119)) % 5] + 
           WORK_3[(seed % (103 + num * 117)) % 5] + 
           WORK_4[(seed % (104 + num * 127)) % 2] + 
           WORK_5[(seed % (105 + num * 131)) % 4];
}
function getWorkData(AuthorID: number, num: number): IWorkData {
    return {
        Caption: getWorkName(AuthorID, num),
        AuthorID: AuthorID,
        Type: WORK_TYPE[num % 2],
        Mark: WORK_MARK[num + (AuthorID % 2)],
        Advisor: ADVISORS[AuthorID % 4]
    }
}
const WORKS: IWorkData[] = [
    {
        ...getWorkData(12345678, 1)
    },
    {
        ...getWorkData(12345678, 2)
    },
    {
        ...getWorkData(12345679, 0)
    },
    {
        ...getWorkData(12345680, 1)
    },
    {
        ...getWorkData(12345681, 1)
    },
    {
        ...getWorkData(12345682, 0)
    },
    {
        ...getWorkData(12345683, 0)
    },
    {
        ...getWorkData(12345683, 1)
    },
    {
        ...getWorkData(12345685, 1)
    },
    {
        ...getWorkData(12345686, 0)
    },
    {
        ...getWorkData(12345687, 1)
    },
    {
        ...getWorkData(12345688, 1)
    }
]

export {
    STUDENTS,
    WORKS
};