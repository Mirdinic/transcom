import { TestData } from './../../../data/TestData';
import { Category } from './../../../model/Category';
import { EditTaskDialogComponent } from './../../../dialog/edit-task-dialog/edit-task-dialog.component';
import { Task } from './../../../model/Task';
import { MatTableDataSource } from '@angular/material/table';
import { DataHandlerService } from './../../../service/data-handler.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// @ts-ignore
import { sortingDataAccessor } from '@angular/material/table'; 
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { config } from 'process';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { Priority } from 'src/app/model/Priority';
import { OperType } from 'src/app/dialog/OperType';
  
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority','category','operations','select'];
  dataSource: MatTableDataSource<Task>;
  //ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;


  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  

  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  filterByTitle = new EventEmitter<string>();
  @Output()
  filterByStatus = new EventEmitter<boolean>();
  @Output()
  filterByPriority = new EventEmitter<Priority>();
  @Output()
  addTask = new EventEmitter<Task>();


  tasks: Task[];
  completed: boolean;
  selectedStatusFilter: boolean=null;
  searchTaskText: string;
  selectedPriorityFilter: Priority;
  priorities: Priority[];


  @Input('tasks') 
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }
  @Input('priorities') 
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }
  @Input()
  selectedCategory: Category;


  constructor(
    private DataHandler: DataHandlerService,
    private dialog: MatDialog,
    dialogRef: MatDialogRef<TasksComponent>,
     ) {

      }
  // ngAfterViewInit(): void {
  //   this.addTableObjects();
  // }

  ngOnInit(){
    // this.DataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    //datasort
    this.dataSource = new MatTableDataSource();
    this.onSelectCategory(null);
  }

  ngAfterViewInit(): void{
    this.addTableObjects();
  }

  //цвет статуса

  public getPriorityColor(task: Task){
    if (task.completed){
      return 'blue';
    }
    if (task.priority && task.priority.color){
      return task.priority.color;
    }
    return 'yellow';
  }


  //показывает задачи с применением всех текущих условий
  private fillTable(){

    if (!this.dataSource){
      return;
    }
    this.dataSource.data = this.tasks; //обновить источник данных (данные массива таск)
    this.addTableObjects();
    

    //когда получаем новые данные
    //чтобы можно было сортировать по столбцам "категория", "приоритет", т.к там не примитивные типы
    //@ts-ignore - показывает ошибку для типа даты, но так работает ,т.к можно возвращать любой тип


    this.dataSource.sortingDataAccessor = (task, colName) => {
      

      switch (colName){
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }
  
  private addTableObjects(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  openEditTaskDialog(task: Task): void{
    const dialogRef = this.dialog.open(EditTaskDialogComponent,{data: [task, 'редактирование задачи',OperType.EDIT], autoFocus: false});
    dialogRef.afterClosed().subscribe(result => { 

      //обработка ресурсов
      if(result === 'complete'){
        task.completed = true;
        this.updateTask.emit(task);
      }
      if(result === 'activate'){
        task.completed = false;
        this.updateTask.emit(task);

      }

      if(result === 'delete'){
        this.deleteTask.emit(task);
        return; 
      }
      if(result as Task) {
        this.updateTask.emit(task);
        return;
      }


    });

    }
  
    openDeleteDialog(task: Task){
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        maxWidth: '500px',
        data:{
          dialogTitle: 'Подвердите действие',
          message: 'вы действительно хотите удалить задачу: "this.task.title"?'
  
        },
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.deleteTask.emit(task);
        }
      });
    }

    onToggleStatus(task: Task){
      task.completed = !task.completed;
      this.updateTask.emit(task);
    }

    onSelectCategory(category: Category){
      this.selectCategory.emit(category);
    }
    
    onFilterByTitle(){
      this.filterByTitle.emit(this.searchTaskText);
    }

    onFilterByStatus(value:boolean){

      //на всякий случай проверяем изменилось ли значение 
      if(value!==this.selectedStatusFilter){
        this.selectedStatusFilter = value;
        this.filterByStatus.emit(this.selectedStatusFilter);
      }
    }
    onFilterByPriority(value: Priority){
      if(value!==this.selectedPriorityFilter){
        this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }
  openAddTaskDialog(){
    const task = new Task(null,'',false,null ,this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent,{data: [task, 'Добавление задачи',OperType.ADD]});
    dialogRef.afterClosed().subscribe(result => { 

      //обработка ресурсов
      if(result){
        this.addTask.emit(task);
      }
  });
  }



}
