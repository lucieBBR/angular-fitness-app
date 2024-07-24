import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
//import { HomeComponent } from './home.component';
//import { ProductsComponent } from './products.component';

export const routes: Routes = [
  //  { path: '', component: HomeComponent },
  //  { path: 'products', component: ProductsComponent }
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent }
];
