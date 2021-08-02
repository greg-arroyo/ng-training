import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { Store } from "../store";
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
}
