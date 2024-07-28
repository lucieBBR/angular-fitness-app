import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MaterialModule, HeaderComponent, SidenavListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-fitness-app';
  openSidenav = false;

 // @ViewChild('sidenav')

}
