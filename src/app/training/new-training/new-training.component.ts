import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining() {
    this.trainingStart.emit();
  }
}
