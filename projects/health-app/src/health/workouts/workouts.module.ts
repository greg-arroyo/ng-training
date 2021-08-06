import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { WorkoutsComponent } from "./containers/workouts/workouts.component";

export const routes: Routes = [
  { path: '', component: WorkoutsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WorkoutsComponent
  ]
})
export class WorkoutsModule {}
