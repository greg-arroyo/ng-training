import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from 'store';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/find';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  workouts$: Observable<Workout[]> = this.db.list<Workout>(`workouts/${this.uid}`)
  .snapshotChanges()
  .map(snapshot => {
    return snapshot.map(s => ({
      $key: s.payload.key,
      $exists: s.payload.exists,
      ...s.payload.val()
    }))
  }).do(next => { this.store.set('workouts', next) });

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ) {
  }

  get uid() {
    return this.store.value.user.uid;
  }

  getWorkout(key: string) {
    if (!key) return Observable.of({
      name: '',
      type: '',
      strength: null,
      endurance: null,
      timestamp: null,
      $key: '',
      $exists: false
    });
    return this.store.select<Workout[]>('workouts')
    .filter(Boolean)
    .map((workouts: Workout[]) => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
