import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h4>Credit Card Directive</h4>
      <label>
        <input
          name="credit-card"
          type="text"
          placeholder="Enter your credit card number"
          credit-card>
      </label>
    </div>
  `
})
export class AppComponent {
}
