import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import { Firestore, collectionSnapshots, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject } from "@angular/core";

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    firestore: Firestore = inject(Firestore);
    private availableExercises: Exercise[] = []
    private runningExercise: Exercise;

    fetchAvailableExercises() {
        const exerciseCollection = collection(this.firestore, 'availableExercises');
        collectionSnapshots(exerciseCollection).pipe(
          map(docArray => docArray.map(doc => {
              const data = doc.data();
              return {
                  id: doc.id,
                  calories: data.calories,
                  duration: data.duration,
                  name: data.name
              } as Exercise;
          }))
        ).subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            console.log('available exercises', this.availableExercises);
            this.exercisesChanged.next([...this.availableExercises]);
        });
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        console.log('running exercise', this.runningExercise)
        this.exerciseChanged.next({...this.runningExercise})
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    fetchCompletedOrCancelledExercises() {
        const finishedExercises = collection(this.firestore, 'finishedExercises')
        collectionData(finishedExercises).subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        })
    }

    private addDataToDatabase(exercise: Exercise) {
        const finishedExercises = collection(this.firestore, 'finishedExercises')
        addDoc(finishedExercises, exercise);
    }
}