import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    MealsComponent,
    MealComponent
  ]
})
export class MealsModule {
}
