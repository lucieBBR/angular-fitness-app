import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MaterialModule, StopTrainingComponent],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css',
})
export class CurrentTrainingComponent {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: ReturnType<typeof setInterval>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumerTimer();
  }

  startOrResumerTimer() {
    this.timer = setInterval(() => {
    this.progress = this.progress + 5;
    if (this.progress >= 100) {
      clearInterval(this.timer);
    }
  }, 1000);
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
      this.trainingExit.emit();
    } else {
       this.startOrResumerTimer();
    }
  })

  }

}
