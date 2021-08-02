import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authFire: AngularFireAuth
  ) {}

  createUser(email: string, password: string) {
    return this.authFire.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(email, password);
  }
}
