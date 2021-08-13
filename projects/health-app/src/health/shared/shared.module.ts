import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent
  ],
  exports: [
    ListItemComponent
  ],
  providers: [
    MealsService,
    WorkoutsService
  ]
})
export class SharedModule {
}
