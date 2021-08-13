import { Component, OnDestroy, OnInit } from '@angular/core';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';

@Component({
  selector: 'workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="../../../../assets/workout.svg" alt="My workouts">
          My workouts
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../workouts/new']">
          <img src="../../../../assets/add-white.svg" alt="New Workout">
          New Workout
        </a>
      </div>
      <div *ngIf="workouts$ | async as workouts; else loading;">
        <div class="message" *ngIf="!workouts.length">
          <img src="../../../../assets/face.svg" alt="Add a workout to get started.">
          No workouts, add a new workout to get started.
        </div>
        <list-item
          *ngFor="let workout of workouts"
          [item]="workout"
          (remove)="removeWorkout($event)">
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="../../../../assets/loading.svg" alt="Loading...">
          Fetching workouts...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private workoutsService: WorkoutsService
  ) {
  }

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.$key).then();
  }
}
