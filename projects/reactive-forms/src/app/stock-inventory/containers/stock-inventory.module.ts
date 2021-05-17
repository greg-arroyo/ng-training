import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StockInventoryComponent } from './stock-inventory/stock-inventory.component';
import { StockBranchComponent } from '../components/stock-branch/stock-branch.component';
import { StockItemsComponent } from '../components/stock-items/stock-items.component';
import { StockSelectorComponent } from '../components/stock-selector/stock-selector.component';
import { StockCounterComponent } from '../components/stock-counter/stock-counter.component';

import { StockItemService } from '../services/stock-inventory.service';

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockItemsComponent,
    StockSelectorComponent,
    StockCounterComponent
  ],
  providers: [
    StockItemService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {}