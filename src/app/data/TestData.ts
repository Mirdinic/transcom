import { Priority } from './../model/Priority';
import { Category } from './../model/Category';
import { Task } from '../model/Task';

export class TestData {
    static categories: Category[] = [
        {id: 1, title: 'Работа'},
        {id: 2, title: 'Семья'},
        {id: 3, title: 'Учеба'},
        {id: 4, title: 'Отдых'},
        {id: 5, title: 'Спорт'},
        {id: 6, title: 'Еда'},
    ];

    static priorities: Priority[] = [
        {id: 1, title: 'Низкий', color: '#e5e5e5'},
        {id: 2, title: 'Средний', color: '#85d1b2'},
        {id: 3, title: 'Высокий', color: '#F1828D'},
        {id: 4, title: 'Очень срочно', color: 'red'},

    ];
    static tasks: Task[] = [
        {
            id: 1,
            title: 'Залить бензин полный бак',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[2],
            date: new Date('2020-04-10')
        },

        {
            id: 2,
            title: 'Передать отчеты начальнику управления',
            priority: TestData.priorities[0],
            completed: true,
            category: TestData.categories[1],
            date: new Date('2020-04-11')
        },

        {
        id: 3,
        title: 'Передать отчеты начальнику',
        priority: TestData.priorities[0],
        completed: true,
        category: TestData.categories[1],
        date: new Date('2020-04-11')
         },
         {
            id: 4,
            title: 'Передать отчеты ',
            priority: TestData.priorities[2],
            completed: true,
            category: TestData.categories[5],
        },
        {
            id: 5,
            title: 'Передать отчеты начальнику управл',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[5],

        },
        {
            id: 6,
            title: 'Передать отчеты начальнику упра',
            priority: TestData.priorities[3],
            completed: false,
        },
        {
            id: 7,
            title: 'Передать отчеты начальнику уп',
            priority: TestData.priorities[3],
            completed: false,
        },
        {
            id: 8,
            title: 'Передать отчеты начальнику управлени',
            priority: TestData.priorities[3],
            completed: false,
        },



    ];
}


