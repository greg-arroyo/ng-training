import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

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
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$
    .withLatestFrom(this.section$)
    .map(([items, section]: any[]) => {
      const id = section.data.$key;

      const payload = {
        section: section.section,
        timestamp: new Date(section.day).getTime(),
        ...items
      }

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    });

  selected$ = this.section$
    .do(next => { this.store.set('selected', next) });

  list$ = this.section$
    .map((value: any) => this.store.value[value.type])
    .do(next => { this.store.set('list', next) });

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

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private deleteSection(key: string) {
    return this.db.list(`schedule/${this.uid}`).remove(key);
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
        ...s.payload.val()
      }))
    })
  }
}
