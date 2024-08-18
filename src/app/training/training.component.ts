import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MaterialModule, NewTrainingComponent, PastTrainingsComponent, CurrentTrainingComponent, CommonModule],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
