import { Category } from './../../../model/Category';
import { DataHandlerService } from './../../../service/data-handler.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { OperType } from 'src/app/dialog/OperType';
import {concatMap, map, count} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];
  @Input() 
  selectedCategory: Category;

  @Input()
  uncompletedTotal: number;

  @Input()
  categoryMap: Map<Category, number>;


  selectedCategoryMap: Map<Category, number>;
  
  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>){
    this.selectedCategoryMap = categoryMap;
    
  }


  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();
  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  addCategory = new EventEmitter<string>();
  @Output()
  searchCategory = new EventEmitter<string>();


 
  indexMouseMove: number;
  searchCategoryTitle: string;

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,

    ) { }

  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe( categories => this.categories = categories);
  }
  showTaskByCategory(category: Category){
    // this.dataHandler.fillTaskByCategory(category);
    // this.selectedCategory = category;

    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);

  }

  
  showEditIcon(index: number){
    this.indexMouseMove = index;
  }


  openEditDialog(category: Category){
    const dialogRef = this.dialog.open(EditCategoryDialogComponent,{
      data: [category.title, 'Редактирование категории',OperType.EDIT],
        width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='delete'){
        this.deleteCategory.emit(category);
        return;
      }

      if(typeof(result) ==='string'){
        category.title = result as string;
        this.updateCategory.emit(category);
        return;
      }
    });

  }

  openAddDialog(){
    const dialogRef = this.dialog.open(EditCategoryDialogComponent,{
      data: ['', 'Добавление категории',OperType.ADD],
        width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.addCategory.emit(result as string);
           
          }
        });
    
  }

  search(){
    if(this.searchCategoryTitle == null){
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
  
}
