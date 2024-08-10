import { Injectable, inject } from '@angular/core';
import { AuthData } from "./auth-data.model";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, authState } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Authentication from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private afAuth: Auth = inject(Auth);  // Injecting the Auth service

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    authState(this.afAuth).subscribe(user => {
      if (user) {
        this.store.dispatch(new Authentication.SetAuthenticated());
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        //this.authChange.next(false);
        this.store.dispatch(new Authentication.SetUnauthenticated());
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    createUserWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    signInWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.trainingService.cancelSubscriptions();
      this.authChange.next(false);
      this.router.navigate(['/login']);
      this.isAuthenticated = false;
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }
}
