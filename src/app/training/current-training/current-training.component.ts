import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MaterialModule, StopTrainingComponent],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css',
})
export class CurrentTrainingComponent {
  progress = 0;
  timer: ReturnType<typeof setInterval>;

  constructor(
    private dialog: MatDialog, 
    private trainingService: TrainingService, 
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumerTimer();
  }

  startOrResumerTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
        const step = ex.duration / 100 * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
       }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.trainingService.cancelExercise(this.progress);
    } else {
       this.startOrResumerTimer();
    }
  })

  }

}
