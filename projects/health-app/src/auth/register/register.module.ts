import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './containers/register/register.component';
import { SharedModule } from '../shared/shared.module';

const routes = [
  { path: '', component: RegisterComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {
}
