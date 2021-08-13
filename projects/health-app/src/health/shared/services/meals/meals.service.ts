import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from 'store';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/find';

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
    return snapshot.map(s => ({
      $key: s.payload.key,
      $exists: s.payload.exists,
      ...s.payload.val()
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

  getMeal(key: string) {
    if (!key) return Observable.of({
      name: '',
      ingredients: [],
      timestamp: null,
      $key: '',
      $exists: false
    });
    return this.store.select<Meal[]>('meals')
      .filter(Boolean)
      .map((meals: Meal[]) => meals.find((meal: Meal) => meal.$key === key));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
