import { MatTableModule } from '@angular/material/table';
import { DataHandlerService } from './../../../service/data-handler.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private displayedColumns: string[] = ['color','id', 'title', 'date', 'priority','category'];
  private dataSource: MatTableDataSource<Task>;

  tasks: Task[];
  constructor(private DataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.DataHandler.tasksSubject.subscribe( tasks => this.tasks = tasks);
  }

  toggleTaskCompleted(task: Task){
    task.completed = !task.completed;
  }
 

}
