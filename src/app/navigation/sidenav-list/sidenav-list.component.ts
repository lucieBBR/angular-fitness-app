import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css'
})
export class SidenavListComponent {

  @Output() closeSidenav = new EventEmitter<void>();

  onClose(){
    this.closeSidenav.emit();
  }
}
