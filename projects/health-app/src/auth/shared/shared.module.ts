import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthService } from "./services/auth/auth.service";
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthFormComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {
}
