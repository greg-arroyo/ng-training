import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
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
  schedule$: Observable<any[]> = this.date$
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
  .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt));

  constructor(
    private store: Store
  ) {
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }
}
