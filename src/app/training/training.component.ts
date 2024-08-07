import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../material.module';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MaterialModule, NewTrainingComponent, PastTrainingsComponent, CurrentTrainingComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if (exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    })
  }

  ngOnDestroy() {
    this.exerciseSubscription?.unsubscribe();
  }
}
