import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collectionSnapshots, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit {
  exercises!: Observable<Exercise[]>;
  firestore: Firestore = inject(Firestore);
  

  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    //this.exercises = this.trainingService.getAvailableExercises();
   // console.log(this.exercises)
    const exerciseCollection = collection(this.firestore, 'availableExercises')
    // Using snapshotChanges to get document data along with metadata
    this.exercises = collectionSnapshots(exerciseCollection).pipe(
      map(docArray => {
        return docArray.map(doc => {
          const data = doc.data() as Exercise;
          const id = doc.id;
          return { id, ...data };
        });
      })
    ) as Observable<Exercise[]>;


    this.exercises.subscribe(result => {
      console.log(result);
    });
  }

  onStartTraining(form: NgForm) {
      this.trainingService.startExercise(form.value.exercise)
  };
}
