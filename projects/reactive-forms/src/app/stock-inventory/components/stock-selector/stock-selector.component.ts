import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="productId">
          <option value="">Select item</option>
          <option
            *ngFor="let product of products"
            [value]="product.id">
            {{ product.name }}
          </option>
        </select>

        <stock-counter
          [step]="1"
          [min]="1"
          [max]="99"
          formControlName="quantity">
        </stock-counter>

        <button
          type="button"
          [disabled]="stockExists || notSelected"
          (click)="onAdd()">
          Add item
        </button>
        <div
          class="stock-selector__error"
          *ngIf="stockExists">
          Item has already been added
        </div>
      </div>
    </div>
  `
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;
  @Input() products: Product[];
  @Output() added = new EventEmitter<any>();

  get stockExists() {
    return (
      this.parent.hasError('stockExists') &&
      this.parent.get('selector.productId').dirty
    );
  }

  get notSelected() {
    return (
      !this.parent.get('selector.productId').value
    );
  }

  onAdd() {
    if (this.parent.get('selector.productId').value) {
      this.added.emit(this.parent.get('selector').value);
      this.resetSelector();
    }
  }

  resetSelector() {
    this.parent.get('selector').reset({
      productId: '',
      quantity: 1
    });
  }
}