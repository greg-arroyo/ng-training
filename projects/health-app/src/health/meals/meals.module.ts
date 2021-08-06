import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MealsComponent } from "./containers/meals/meals.component";

export const routes: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MealsComponent
  ]
})
export class MealsModule {}
