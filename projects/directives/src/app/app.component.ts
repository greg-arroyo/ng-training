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
      <br/>
      <h4>Tooltip Directive</h4>
      <input
        type="text"
        placeholder="Enter CVV code"
        style="width:160px;"
      >
      <span 
        (mouseover)="cvvTooltip.show()"
        (mouseout)="cvvTooltip.hide()"
        tooltip="CVV on back of card"
        #cvvTooltip="tooltip">
        (?)
      </span>
    </div>
  `
})
export class AppComponent {
}
