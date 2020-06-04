import { TestData } from './../data/TestData';
import { Category } from './../model/Category';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);
  constructor() { 
    this.fillTask();
  }

  // getCategories(): Category[]{
  //   return TestData.categories;
  // }
  fillTask(){
    this.tasksSubject.next(TestData.tasks)

  }
  fillTaskByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.tasksSubject.next(tasks)   
  }
}
