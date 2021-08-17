import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<ScheduleItem[]> = this.date$
  .do((next: any) => this.store.set('date', next))
  .map((day: any) => {
    const startAt = (
      new Date(day.getFullYear(), day.getMonth(), day.getDate())
    ).getTime();
    const endAt = (
      new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    ).getTime() - 1;
    return { startAt, endAt };
  })
  .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
  .map((data: any) => {
    const mapped: ScheduleList = {};
    for (const prop of data) {
      if (!mapped[prop.section]) {
        mapped[prop.section] = prop;
      }
    }
    return mapped;
  })
  .do((next: any) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ) {
  }

  get uid() {
    return this.store.value.user.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list<ScheduleList>(`schedule/${this.uid}`,
        ref =>
          ref.orderByChild('timestamp')
            .startAt(startAt)
            .endAt(endAt)
    )
    .snapshotChanges()
    .map(snapshot => {
      return snapshot.map(s => ({
        $key: s.payload.key,
        $exists: s.payload.exists,
        ...s.payload.val()
      }))
    })
  }
}
