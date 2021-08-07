import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meal, MealsService } from "../../../shared/services/meals/meals.service";
import { Observable, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Store } from "../../../../store";

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div>
      {{ meals$ | async | json }}
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
