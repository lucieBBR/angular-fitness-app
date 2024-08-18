import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  
  constructor(
    private trainingService: TrainingService,
    private store: Store<{ui: fromRoot.State}>
    ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
      this.trainingService.startExercise(form.value.exercise)
  };
}
