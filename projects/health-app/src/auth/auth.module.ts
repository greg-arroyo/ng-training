import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from "./shared/shared.module";

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDGjf27DpvPIYy9swhOjqKHnWuaNE7JiWg",
  authDomain: "health-app-eb2ce.firebaseapp.com",
  databaseURL: "https://health-app-eb2ce-default-rtdb.firebaseio.com",
  projectId: "health-app-eb2ce",
  storageBucket: "health-app-eb2ce.appspot.com",
  messagingSenderId: "838776765803",
  appId: "1:838776765803:web:a015b28d4d55ab71eb202e"
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule
  ],
})
export class AuthModule {
}
