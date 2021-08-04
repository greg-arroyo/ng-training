import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from "../../../auth/shared/services/auth/auth.service";
import { Observable, Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Store } from '../../../store';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
      <app-header
      [user]="user$ | async"
      (logout)="onLogout()">
      </app-header>
      <app-nav
        *ngIf="(user$ | async)?.authenticated">
      </app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
  }

  async onLogout() {
    await this.authService.logoutUser();
    await this.router.navigate(['/auth/login']);
  }
}
