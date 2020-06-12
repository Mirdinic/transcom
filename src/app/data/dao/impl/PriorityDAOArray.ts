import { Priority } from './../../../model/Priority';
import { TestData } from './../../TestData';
import { PriorityDAO } from './../interface/PriorityDAO';
import { Observable, of } from 'rxjs';
  
export class PriorityDAOArray implements PriorityDAO{
    static priorities = TestData.priorities;
    add(priority: Priority): import("rxjs").Observable<import("../../../model/Priority").Priority> {
        if(priority.id === null || priority.id === 0){
            priority.id = this.getLastIdPriority();
        }
        PriorityDAOArray.priorities.push(priority);
        return of(priority);
    } 

    getLastIdPriority(): number{
        return Math.max.apply(Math, PriorityDAOArray.priorities.map(c=>c.id))+1;
    }
    get(id: number): import("rxjs").Observable<import("../../../model/Priority").Priority> {
        return of(PriorityDAOArray.priorities.find(priority =>priority.id =id));
    }
    delete(id: number): import("rxjs").Observable<import("../../../model/Priority").Priority> {
        TestData.tasks.forEach(task=>{
            if(task.priority && task.priority.id===id){
                task.priority = null;
            }
        });
        const  tmpPriority = PriorityDAOArray.priorities.find(t=>t.id===id);
        PriorityDAOArray.priorities.splice(PriorityDAOArray.priorities.indexOf(tmpPriority), 1);
        return of(tmpPriority);
    }
    update(priority: Priority): import("rxjs").Observable<import("../../../model/Priority").Priority> {
        const  tmpPriority = PriorityDAOArray.priorities.find(t=>t.id===priority.id);
        PriorityDAOArray.priorities.splice(PriorityDAOArray.priorities.indexOf(tmpPriority), 1, priority);
        return of(tmpPriority);
    }
    getAll(): import("rxjs").Observable<import("../../../model/Priority").Priority[]> {
        return of(PriorityDAOArray.priorities);
    }

}