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

/*
var firebaseConfig = {
  apiKey: "AIzaSyDGjf27DpvPIYy9swhOjqKHnWuaNE7JiWg",
  authDomain: "health-app-eb2ce.firebaseapp.com",
  databaseURL: "https://health-app-eb2ce-default-rtdb.firebaseio.com",
  projectId: "health-app-eb2ce",
  storageBucket: "health-app-eb2ce.appspot.com",
  messagingSenderId: "838776765803",
  appId: "1:838776765803:web:a015b28d4d55ab71eb202e"
};
 */
