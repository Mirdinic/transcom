import { TasksComponent } from './views/tasks/tasks/tasks.component';
import { TaskDAOArray } from './data/dao/impl/TaskDAOArray';
import { Category } from './model/Category';
import { DataHandlerService } from './service/data-handler.service';
import { Task } from './model/Task';
import { Component, OnInit, Input } from '@angular/core';
import { Priority } from './model/Priority';
import { zip } from 'rxjs';
import {concatMap, map, count} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo';

  //коллекция категорий с кол-вом незавершенных задач для каждой из них
  categoryMap = new Map<Category, number>();


  //колекция категорий с кол-вом незавершенных задач для каждой из них
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  //Выбранная категория
  selectedCategory: Category=null;

  // поиск
  searchTaskText= '';
  statusFilter: boolean;
  priorityFilter: Priority;
  searchCategoryText: string;


  //статистика
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  //показать/скрыть статистику
  showStat=true;


  constructor(private dataHandler: DataHandlerService){

  }
  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe( categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe( priorities => this.priorities = priorities);

    this.onSelectCategory(null);
  }
  onSelectCategory(category: Category){
    this.selectedCategory = category;
    
    this.updateTasksAndStat();

  }
  onUpdateTask(task: Task){
     this.dataHandler.updateTask(task).subscribe(()=>{
      this.fillCategories();
      this.updateTasksAndStat();
    });  
  }
 
  onDeleteTask(task: Task){
    this.dataHandler.deleteTask(task.id).pipe(
      concatMap(task=>{
        return this.dataHandler.getUnCompletedCountInCategory(task.category).pipe(map(count=>{
          return ({t: task,count});
        }));
      }
      )).subscribe(result=>{
        const t = result.t as Task;
        if(t.category){this.categoryMap.set(t.category, result.count);}
      this.updateTasksAndStat();

    });   
  }

  onDeleteCategory(category: Category){
    this.dataHandler.deleteCategory(category.id).subscribe(cat=>{
      this.selectedCategory = null;
      this.categoryMap.delete(cat);
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });

   
  }

  onUpdateCategory(category: Category){
    this.dataHandler.updateCategory(category).subscribe(()=>{
      this.onSearchCategory(this.searchCategoryText);
    });

   
  }

  onSearchTasks(searchString: string){
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean){
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority){
    this.priorityFilter = priority;
    this.updateTasks();

  }


  updateTasks(){
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[])=>{
        this.tasks = tasks;
      });   
  }

  onAddTask(task: Task){

    this.dataHandler.addTask(task).pipe(
      concatMap(task=>{
        return this.dataHandler.getUnCompletedCountInCategory(task.category).pipe(map(count=>{
          return ({t: task, count});
        }));
        })).subscribe(result=>{
          const t=result.t as Task;
          if(t.category){
            this.categoryMap.set(t.category, result.count);
          }
      
      this.updateTasksAndStat();
    });
  }
  onAddCategory(title: string){
    this.dataHandler.addCategory(title).subscribe(()=>this.updateCategories());
  }
 

  updateCategories(){
    this.categories.forEach(cat=>{
      this.dataHandler.getAllCategories().subscribe(categories=>this.categories = this.categories);
    });
  }
  onSearchCategory(title: string){
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories=>{
      this.categories = categories;
    });

  }

  fillCategories(){
    if(this.categoryMap){
      this.categoryMap.clear();
    }
    this.categories = this.categories.sort((a,b)=> a.title.localeCompare(b.title));

    this.categories.forEach(cat=>{
      this.dataHandler.getUnCompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });
  }

  updateTasksAndStat(){
    this.updateTasks();
    this.updateStat();
  }

  updateStat(){
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUnCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUnCompletedTotalCount()
    )
    .subscribe(array=>{
      this.totalTasksCountInCategory = array[0];
      this.completedCountInCategory = array[1];
      this.uncompletedCountInCategory = array[2];
      this.uncompletedTotalTasksCount = array[3];
    });
  }

  toggleStat(showStat: boolean){
    this.showStat = showStat;
  }

}
