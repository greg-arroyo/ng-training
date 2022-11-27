import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-items',
  styleUrls: ['stock-items.component.scss'],
  template: `
    <div class="stock-item" [formGroup]="parent">
      <div formArrayName="items">
        <div *ngIf="!items.length" class="stock-item__no-items">
          <i>Please select an item to continue.</i>
        </div>
        <div
          *ngFor="let item of items; let i = index;">
          <div class="stock-item__content" [formGroupName]="i">

            <div class="stock-item__name">
              {{ getProduct(item.value.productId).name }}
            </div>
            <div class="stock-item__price">
              {{ getProduct(item.value.productId).price | currency:'USD':'$' }}
            </div>

            <stock-counter
              [step]="1"
              [min]="1"
              [max]="99"
              formControlName="quantity">
            </stock-counter>

            <button
              type="button"
              (click)="onRemove(i)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StockItemsComponent {
  @Input() parent: UntypedFormGroup;
  @Input() map: Map<number, Product>;
  @Output() removed = new EventEmitter<any>();

  getProduct(id) {
    return this.map.get(id);
  }

  onRemove(index) {
    this.removed.emit({ index });
  }

  get items() {
    return (this.parent.get('items') as UntypedFormArray).controls;
  }
}