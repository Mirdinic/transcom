import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { Priority } from './../../model/Priority';
import { EditPriorityDialogComponent } from './../../dialog/edit-priority-dialog/edit-priority-dialog.component';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from 'src/app/dialog/OperType';
@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

  @Input()
  priorities: [Priority];

  @Output()
  deletePriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  addPriority = new EventEmitter<Priority>();



  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }

 
  onAddPriority(){
    const dialogRef = this.dialog.open(EditPriorityDialogComponent,{
      data: ['', 'Добавление категории',OperType.ADD], width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    
      
      
    });

  }


  onEditPriority(priority: Priority){
    const dialogRef = this.dialog.open(EditPriorityDialogComponent,{
      data: [priority.title, 'Редактирование категории',OperType.EDIT]});

    dialogRef.afterClosed().subscribe(result => {
      if(result==='delete'){
        this.deletePriority.emit(priority);
        return;
      }

      if(result){
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });

  }
  delete(priority: Priority){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${priority.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
       this.deletePriority.emit(priority);
      }
    });

  }

}
