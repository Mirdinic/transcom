import { Observable } from 'rxjs';
import { Priority } from './../../../model/Priority';
import { Category } from './../../../model/Category';
import { Task } from './../../../model/Task';
import { CommonDAO } from './CommonDAO';
export interface TaskDAO extends CommonDAO<Task>{
    //поиск задач по всем параметрам
    //ессли какой либо параметр равен нул- он не будет учитываться при поиске
    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

    //кол-вщ завершенных задач в заданной категории (если category === null , то для всех категорий)
    getCompletedCountInCategory(category: Category): Observable<number>;

    //кол-во незавершенных задач
    getUnCompletedCountInCategory(category: Category): Observable<number>;

    //кол-вщ всех задач в заданной катег
    getTotalCountInCategory(category: Category): Observable<number>;

    //кол-вщ все задач в общем
    getTotalCount(): Observable<number>;

}