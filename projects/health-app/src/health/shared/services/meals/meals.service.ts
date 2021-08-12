import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from 'store';
import { Observable } from 'rxjs';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`)
  .snapshotChanges()
  .map(snapshot => {
    return snapshot.map(c => ({
      $key: c.payload.key,
      $exists: c.payload.exists,
      ...c.payload.val()
    }))
  }).do(next => { this.store.set('meals', next) });

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ) {
  }

  get uid() {
    return this.store.value.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
