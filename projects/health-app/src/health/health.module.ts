import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "./shared/shared.module";

export const routes: Routes = [
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HealthModule {
}
