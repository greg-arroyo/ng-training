import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { Observable, Subject, Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="../../../../assets/workout.svg" alt="Create workout">
          <span *ngIf="workout$ | async as workout; else title;">
            {{ workout.name ? 'Edit' : 'Create' }} workout
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading;">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)">
        </workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="../../../../assets/loading.svg" alt="Loading...">
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout>;
  subscription: Subscription;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe();
    this.workout$ = this.route.params
    .switchMap(param => {
      return this.workoutsService.getWorkout(param.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async addWorkout(event: Workout) {
    this.workoutsService.addWorkout(event);
    await this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    await this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    await this.backToWorkouts();
  }

  async backToWorkouts() {
    await this.router.navigate(['workouts']);
  }
}
