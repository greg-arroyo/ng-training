import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthService } from "./services/auth/auth.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthFormComponent
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {}
