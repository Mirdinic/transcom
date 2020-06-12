import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string {

    if(date==null){
      return 'Без срока';
    }
    date = new Date(date);

    const currenDate = new Date().getDate();

    if(date.getDate()=== currenDate){
      return 'Сегодня';
    }
    if(date.getDate()===currenDate-1){
      return 'Вчера';
    } 
    if(date.getDate()===currenDate+1){
      return 'Завтра';
    }
    return new DatePipe('En-en').transform(date,format);
  }

}
