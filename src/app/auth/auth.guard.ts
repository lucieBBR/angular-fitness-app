import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private authService: AuthService, 
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this.authService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }   
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route) {
        // if (this.authService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }   
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}