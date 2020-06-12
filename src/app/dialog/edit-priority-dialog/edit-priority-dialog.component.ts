import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OperType } from '../OperType';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [string, string,OperType],
    private DataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) { }
  operType: OperType;  
  dialogTitle: string;
  priorityTitle: string;
  ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

      
  }

  onConfirm(){
    this.dialogRef.close(this.priorityTitle);
  }
  onCancel(){
    this.dialogRef.close(false);
  }

  delete(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '500px',
      data:{
        dialogTitle: 'Подвердите действие',
        message: `вы действительно хотите удалить категорию: "${this.priorityTitle}"?`

      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close('delete');
      }
    });
  }

  canDelete(): boolean{
    return this.operType === OperType.EDIT;
  }


}
