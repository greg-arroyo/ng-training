import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from 'store';
import 'rxjs/add/operator/do';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth$ = this.authFire.authState
  .do(next => {
    if (!next) {
      this.store.set('user', null);
      return;
    }
    const user: User = {
      email: next.email,
      uid: next.uid,
      authenticated: true
    }
    this.store.set('user', user);
  });

  constructor(
    private store: Store,
    private authFire: AngularFireAuth
  ) {
  }

  get user() {
    return this.authFire.currentUser;
  }

  get authState() {
    return this.authFire.authState;
  }

  createUser(email: string, password: string) {
    return this.authFire.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.authFire.signOut();
  }
}
