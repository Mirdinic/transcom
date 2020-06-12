import { Priority } from './../../model/Priority';
import { Category } from './../../model/Category';
import { TasksComponent } from './../../views/tasks/tasks/tasks.component';
import { DataHandlerService } from './../../service/data-handler.service';
import { Task } from './../../model/Task';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';



@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Task, string,OperType],
    private DataHandler: DataHandlerService,
    private dialog: MatDialog,
  ) { }
    categories: Category[];
    priorities: Priority[];
    operType: OperType;  

    
    public dialogTitle: string;
   
    task: Task;
    tmpTitle: string;
    tmpCategory: Category;
    tmpPriority: Priority;
    tmpDate: Date;

  ngOnInit(){
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
    this.tmpTitle = this.task.title;
    this.tmpPriority= this.task.priority;
    this.tmpCategory = this.task.category;
    this.tmpDate = this.task.date;
    this.DataHandler.getAllPriorities().subscribe(items => this.priorities =items);

    this.DataHandler.getAllCategories().subscribe(items => this.categories =items);

  }

  onConfirm(): void{
    this.task.date = this.tmpDate;
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;



    this.dialogRef.close(this.task);
    

  }
  
  onCancel(): void{
    this.dialogRef.close(null);
  }
  
  delete(){
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
        this.dialogRef.close('delete');
      }
    });
  }
  
  complete(){
    this.dialogRef.close('complete');
  }

  activate(){
    this.dialogRef.close('activate');
  }
  canDelete(): boolean{
    return this.operType === OperType.EDIT;
  }
  canActivateDesactivate(): boolean{
    return this.operType === OperType.EDIT
  }
}
