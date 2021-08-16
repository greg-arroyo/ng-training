import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from 'store';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async">
      </schedule-calendar>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit() {
    this.date$ = this.store.select('date');

    this.subscriptions = [
      this.scheduleService.schedule$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
