import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal, MealsService } from "../../../shared/services/meals/meals.service";
import { Observable, Subject, Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="../../../../assets/food.svg" alt="Create meal">
          <span *ngIf="meal$ | async as meal; else title;">
            {{ meal.name ? 'Edit' : 'Create' }} meal
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading;">
        <meal-form
          [meal] = "meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="../../../../assets/loading.svg" alt="Loading...">
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subscription: Subscription;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
    this.meal$ = this.route.params
      .switchMap(param => {
          return this.mealsService.getMeal(param.id);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
  }

  async addMeal(event: Meal) {
    this.mealsService.addMeal(event);
    await this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    await this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    await this.backToMeals();
  }

  async backToMeals() {
    await this.router.navigate(['meals']);
  }
}
