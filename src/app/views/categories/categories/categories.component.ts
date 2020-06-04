import { Category } from './../../../model/Category';
import { DataHandlerService } from './../../../service/data-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit() {
    this.dataHandler.categoriesSubject.subscribe( categories => this.categories = categories);
  }
  showTaskByCategory(category: Category){
    this.dataHandler.fillTaskByCategory(category);
    this.selectedCategory = category;
  }

}
