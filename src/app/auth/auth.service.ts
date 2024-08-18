import { Injectable, inject } from '@angular/core';
import { AuthData } from "./auth-data.model";
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, authState } from '@angular/fire/auth';
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
  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;
  

  constructor(
    private afAuth: Auth = inject(Auth),
    private router: Router,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    authState(this.afAuth).subscribe(user => {
      if (user) {
        this.store.dispatch(new Authentication.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Authentication.SetUnauthenticated());
        this.router.navigate(['/login']);
       // this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    createUserWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    signInWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.trainingService.cancelSubscriptions();
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }
}
