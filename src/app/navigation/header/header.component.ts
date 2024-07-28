import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter<void>()

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
