import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Store } from "../../../../store";
import { Observable } from "rxjs";

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
    .valueChanges()
    .do(next => this.store.set('meals', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ) {
  }

  get uid() {
    // temporary till we can get uid from authservice.user
    return this.store.value.user.uid;
  }
}
