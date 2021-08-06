import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: 'login', loadChildren: () => import('../auth/login/login.module').then(r => r.LoginModule) },
      { path: 'register', loadChildren: () => import('../auth/register/register.module').then(r => r.RegisterModule) }
    ]
  },
  { path: 'schedule', loadChildren: () => import('../health/schedule/schedule.module').then(r => r.ScheduleModule) },
  { path: 'meals', loadChildren: () => import('../health/meals/meals.module').then(r => r.MealsModule ) },
  { path: 'workouts', loadChildren: () => import('../health/workouts/workouts.module').then(r => r.WorkoutsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
