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
        {id: 1, title: 'Средний', color: '#85d1b2'},
        {id: 1, title: 'Высокий', color: '#F1828D'},
        {id: 1, title: 'Очень срочно', color: '#F1128D'},

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
        category: TestData.categories[0],
        date: new Date('2020-04-11')
         },
         {
            id: 2,
            title: 'Передать отчеты начальнику управления',
            priority: TestData.priorities[0],
            completed: false,
        },




    ];
}


