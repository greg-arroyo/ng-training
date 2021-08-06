import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../auth/shared/guards/auth.guard";

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('../health/schedule/schedule.module').then(r => r.ScheduleModule) },
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: 'login', loadChildren: () => import('../auth/login/login.module').then(r => r.LoginModule) },
      { path: 'register', loadChildren: () => import('../auth/register/register.module').then(r => r.RegisterModule) }
    ]
  },
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: () => import('../health/schedule/schedule.module').then(r => r.ScheduleModule) },
  { path: 'meals', canActivate: [AuthGuard], loadChildren: () => import('../health/meals/meals.module').then(r => r.MealsModule ) },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: () => import('../health/workouts/workouts.module').then(r => r.WorkoutsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
