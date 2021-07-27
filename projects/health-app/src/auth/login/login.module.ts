import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { SharedModule } from '../shared/shared.module';

const routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
