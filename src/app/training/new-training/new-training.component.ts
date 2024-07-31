import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  
  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises =>
      this.exercises = exercises);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
      this.trainingService.startExercise(form.value.exercise)
  };

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
