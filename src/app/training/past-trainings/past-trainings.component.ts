import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.css'
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state' ];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }
}
