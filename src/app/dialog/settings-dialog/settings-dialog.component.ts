import { Priority } from './../../model/Priority';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities: Priority[];
  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandler: DataHandlerService
    ) { }

  ngOnInit(){
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }
  onClose(){
    this.dialogRef.close(false);
  }

  onAddPriority(priority: Priority){
    this.dataHandler.addPriority(priority).subscribe(()=>this.updatePriorities());
    
  }

  updatePriorities(){
    this.priorities.forEach(priority=>{
      this.dataHandler.getAllPriorities().subscribe(priorities=>this.priorities = this.priorities);
    });
  }
  onDeletePriority(priority: Priority){
    this.dataHandler.deletePriority(priority.id).subscribe();
  }
  onUpdatePriority(priority: Priority){
    this.dataHandler.updatePriority(priority).subscribe();
  }

}
