import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MaterialModule, HeaderComponent, SidenavListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService ) {}

  title = 'angular-fitness-app';
  openSidenav = false;
  
  ngOnInit() {
    this.authService.initAuthListener();
  }

 // @ViewChild('sidenav')

}
