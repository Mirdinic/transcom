import { TestData } from './../../TestData';
import { CategoryDAO } from './../interface/CategoryDAO';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/model/Category';
export class CategoryDAOArray implements CategoryDAO{
    search(title: string): import("rxjs").Observable<import("../../../model/Category").Category[]> {
        return of(TestData.categories.filter(
            cat=> cat.title.toUpperCase().includes(title.toUpperCase()))
        .sort((c1,c2)=>c1.title.localeCompare(c2.title)));
    }

   
    add(category: Category): import("rxjs").Observable<import("../../../model/Category").Category> {
        if(category.id === null || category.id === 0){
            category.id = this.getLastIdCategory();
        }
        TestData.categories.push(category);
        return of(category);
    }

    getLastIdCategory(): number{
        return Math.max.apply(Math, TestData.categories.map(c=>c.id))+1;
    }
    get(id: number): import("rxjs").Observable<import("../../../model/Category").Category> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): import("rxjs").Observable<import("../../../model/Category").Category> {
        TestData.tasks.forEach(task=>{
            if(task.category && task.category.id===id){
                task.category = null;
            }
        });
        const  tmpCategory = TestData.categories.find(t=>t.id===id);
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
        return of(tmpCategory);
    }
    update(category: Category): import("rxjs").Observable<import("../../../model/Category").Category> {
        const  tmpCategory = TestData.categories.find(t=>t.id===category.id);
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);
        return of(tmpCategory);
    }
    getAll(): import("rxjs").Observable<import("../../../model/Category").Category[]> {
        return of(TestData.categories);
    }

}