import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';


@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [string, string,OperType],
    private DataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) { }
  operType: OperType;  
  dialogTitle: string;
  categoryTitle: string;
  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

      
  }

  onConfirm(){
    this.dialogRef.close(this.categoryTitle);
    
  }
  onCancel(){
    this.dialogRef.close(false);
  }

  delete(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '500px',
      data:{
        dialogTitle: 'Подвердите действие',
        message: `вы действительно хотите удалить категорию: "${this.categoryTitle}"?`

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
