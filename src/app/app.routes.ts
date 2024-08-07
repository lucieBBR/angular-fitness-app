import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';
//import { HomeComponent } from './home.component';
//import { ProductsComponent } from './products.component';

export const routes: Routes = [
  //  { path: '', component: HomeComponent },
  //  { path: 'products', component: ProductsComponent }
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'training', 
  //  canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadComponent: () => import('./training/training.component').then(m => m.TrainingComponent),
    children: [
      {
        path: 'past', 
        loadComponent: () => import('./training/past-trainings/past-trainings.component').then(m => m.PastTrainingsComponent)
      },
      {
        path: 'new', 
        loadComponent: () => import('./training/new-training/new-training.component').then(m => m.NewTrainingComponent)
      },
      {
        path: 'current', 
        loadComponent: () => import('./training/current-training/current-training.component').then(m => m.CurrentTrainingComponent)
      },
      { 
        path: '', 
        redirectTo: 'new', 
        pathMatch: 'full' 
      }
    ]
  }
];
