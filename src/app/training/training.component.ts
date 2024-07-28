import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from "./current-training/current-training.component";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MaterialModule, NewTrainingComponent, PastTrainingsComponent, CurrentTrainingComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent {
  ongoingTraining = false;
}
