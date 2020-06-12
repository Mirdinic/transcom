import { Priority } from './../../../model/Priority';
import { Category } from './../../../model/Category';
import { TestData } from './../../TestData';
import { TaskDAO } from './../interface/TaskDAO';
import { Observable, of } from "rxjs";
import { Task } from 'src/app/model/Task';
export class TaskDAOArray implements TaskDAO{
    search(category: import("../../../model/Category").Category, searchText: string, status: boolean, priority: import("../../../model/Priority").Priority): import("rxjs").Observable<import("../../../model/Task").Task[]> {
        return of(this.searchTasks(category, searchText, status, priority))
    }

    searchTasks(category: Category,searchText: string ,status: boolean , priority: Priority): Task[]{
        let allTasks = TestData.tasks;
        if (status != null){
            allTasks = allTasks.filter(task => task.completed === status);
        }
        
        if (category != null){
            allTasks = allTasks.filter(task => task.category === category);
        }
        if (priority != null){
            allTasks = allTasks.filter(task => task.priority === priority);
        }
        if (searchText != null){
            allTasks = allTasks.filter(task => task.title.toUpperCase().includes(searchText.toUpperCase()));
        }

        return allTasks;
    }
    
   
    getCompletedCountInCategory(category: import("../../../model/Category").Category): import("rxjs").Observable<number> {
       return of(this.searchTasks(category,null,true,null).length);
    }
    getUnCompletedCountInCategory(category: import("../../../model/Category").Category): import("rxjs").Observable<number> {
        return of(this.searchTasks(category,null,false,null).length);

    }
    getTotalCountInCategory(category: import("../../../model/Category").Category): import("rxjs").Observable<number> {
        return of(this.searchTasks(category,null,null,null).length);

    }
    getTotalCount(): import("rxjs").Observable<number> {
        return of(TestData.tasks.length);

    }
    add(task: Task): import("rxjs").Observable<import("../../../model/Task").Task> {
        if(task.id === null || task.id === 0){
            task.id = this.getLastIdTask();
        }
        TestData.tasks.push(task);
        return of(task);
    }

    private getLastIdTask(): number{
        return Math.max.apply(Math, TestData.tasks.map(task => task.id))+1;
    }
    get(id: number): import("rxjs").Observable<import("../../../model/Task").Task> {
        return of(TestData.tasks.find(todo => todo.id === id))
    }
    delete(id: number): import("rxjs").Observable<import("../../../model/Task").Task> {
    const taskTmp = TestData.tasks.find(t=>t.id ===id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
    return of(taskTmp);

    }
    update(task: Task): import("rxjs").Observable<import("../../../model/Task").Task> {
        const taskTmp = TestData.tasks.find(t=>t.id ===task.id);
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
        return of(task);

    }
    getAll(): import("rxjs").Observable<import("../../../model/Task").Task[]> {
        return of(TestData.tasks);
    }
    
}
    
