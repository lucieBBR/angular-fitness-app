import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoading = true;
  private loadingSubs: Subscription;
  
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
    ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises =>
      this.exercises = exercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
      this.trainingService.startExercise(form.value.exercise)
  };

  ngOnDestroy() {
    this.exerciseSubscription?.unsubscribe();
    this.loadingSubs?.unsubscribe();
  }
}
