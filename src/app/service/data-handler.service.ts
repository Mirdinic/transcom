import { CategoryDAOArray } from './../data/dao/impl/CategoryDAOArray';
import { PriorityDAOArray } from './../data/dao/impl/PriorityDAOArray';
import { Priority } from './../model/Priority';
import { TaskDAOArray } from './../data/dao/impl/TaskDAOArray';
import { TestData } from './../data/TestData';
import { Category } from './../model/Category';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  searchTasks(category: Category,searchText: string, status: boolean,priority: Priority):Observable<Task[]>{
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  constructor(){
    
  }

  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();

  //Задачи

  getAllTasks(): Observable<Task[]>{
    return this.taskDaoArray.getAll(); 
  }
  updateTask(task: Task):Observable<Task>{
    return this.taskDaoArray.update(task);
  }
  deleteTask(id: number):Observable<Task>{
    return this.taskDaoArray.delete(id);
  }
  addTask(task: Task):Observable<Task>{
    return this.taskDaoArray.add(task);
  }

 //  категории
  getAllCategories(): Observable<Category[]>{
    return this.categoryDaoArray.getAll();
  }
 
  deleteCategory(id: number):Observable<Category>{
    return this.categoryDaoArray.delete(id);
  }
  updateCategory(category: Category):Observable<Category>{
    return this.categoryDaoArray.update(category);
  }
 
  addCategory(title: string): Observable<Category>{
    return this.categoryDaoArray.add(new Category(null,title));
  }
  searchCategories(title: string): Observable<Category[]>{
    return this.categoryDaoArray.search(title);
  }


//Приоритеты
  getAllPriorities(): Observable<Priority[]>{
    return this.priorityDaoArray.getAll();
  }

  deletePriority(id: number):Observable<Priority>{
    return this.priorityDaoArray.delete(id);
  }
  updatePriority(priority: Priority):Observable<Priority>{
    return this.priorityDaoArray.update(priority);
  }
 
  addPriority(priority: Priority): Observable<Priority>{
    return this.priorityDaoArray.add(priority);
  }
  
 


  //статистика

  getCompletedCountInCategory(category: Category):Observable<number>{
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }
  getUnCompletedTotalCount():Observable<number>{
    return this.taskDaoArray.getUnCompletedCountInCategory(null);
  }
  getUnCompletedCountInCategory(category: Category):Observable<number>{
    return this.taskDaoArray.getUnCompletedCountInCategory(category);
  }
  getTotalCountInCategory(category: Category):Observable<number>{
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

}
