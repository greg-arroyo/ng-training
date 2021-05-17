import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from "rxjs/operators";
import { CartItem, Product } from '../../models/product.interface';
import { StockItemService } from '../../services/stock-inventory.service';
import { StockValidators } from './stock-inventory.validators';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <h1>Inventory Order Form</h1>
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch [parent]="form"></stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addItem($event)">
        </stock-selector>

        <stock-items
          [parent]="form"
          [map]="productMap"
          (removed)="removeItem($event)">
        </stock-items>

        <div class="stock-inventory__price">
          Order Total: {{ total | currency:'USD':'$' }}
        </div>

        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order Item(s)
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {

  products: Product[];
  productMap: Map<number, Product>;
  total: number;

  form = this.fb.group({
    store: this.fb.group({
      branch: ['', [Validators.required, StockValidators.checkBranch], [this.branchExists.bind(this)]],
      code: ['', Validators.required]
    }),
    selector: this.createItem({}),
    items: new FormArray([], [Validators.required])
  }, { validator: StockValidators.checkItemExists });

  constructor(
    private fb: FormBuilder,
    private itemService: StockItemService
  ) {
  }

  ngOnInit() {
    forkJoin({
      cart: this.itemService.getCartItems(),
      products: this.itemService.getProducts()
    })
    .subscribe(({ cart, products }) => {
      const map = products.map<[number, Product]>(product => [product.id, product]);
      this.productMap = new Map<number, Product>(map);
      this.products = products;
      cart.forEach(item => this.addItem(item));

      this.calculateTotal(this.form.get('items').value);
      this.form.get('items').valueChanges.subscribe(value => this.calculateTotal(value));
    });
  }

  createItem(item) {
    return this.fb.group({
      productId: (parseInt(item.productId, 0) || ''),
      quantity: (item.quantity || 1)
    })
  }

  addItem(item) {
    const control = this.form.get('items') as FormArray;
    control.push(this.createItem(item));
  }

  removeItem(index) {
    const control = this.form.get('items') as FormArray;
    control.removeAt(index);
  }

  branchExists(control: AbstractControl) {
    return this.itemService.getBranchExists(control.value)
    .pipe(map((response: boolean) => {
      return response ? null : { branchDoesNotExist: true }
    }));
  }

  calculateTotal(value: CartItem[]) {
    this.total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.productId).price)
    }, 0);
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}
