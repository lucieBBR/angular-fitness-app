import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
