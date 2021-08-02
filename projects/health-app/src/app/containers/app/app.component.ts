import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
      <div class="app-name">HealthApp</div>
      <div class="wrapper">
        <a routerLink="/auth/login">Login</a>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  constructor() {
  }
}
