import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="../../../../assets/food.svg" alt="My meals">
          My meals
        </h1>
        <a 
          class="btn__add"
          [routerLink]="['../meals/new']">
          <img src="../../../../assets/add-white.svg" alt="New Meal">
          New Meal
        </a>
      </div>
      <div *ngIf="meals$ | async as meals; else loading;">
        <div class="message" *ngIf="!meals.length">
          <img src="../../../../assets/face.svg" alt="Add a meal to get started.">
          No meals, add a new meal to start.
        </div>
        <!-- meals list -->
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="../../../../assets/loading.svg" alt="Loading...">
          Fetching meals...
        </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) {
  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
  }
}
