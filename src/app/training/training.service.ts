import { Subject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { Store } from "@ngrx/store";
import { Firestore, collectionSnapshots, collection, collectionData, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { inject, Injectable } from "@angular/core";
import { UIService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';


@Injectable({
    providedIn: 'root',
  })
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    firestore: Firestore = inject(Firestore);
    private availableExercises: Exercise[] = []
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];
    constructor (
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {};

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        //this.uiService.loadingStateChanged.next(true);
        const exerciseCollection = collection(this.firestore, 'availableExercises');
        this.fbSubs.push(collectionSnapshots(exerciseCollection).pipe(
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
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            // this.availableExercises = exercises;
            // console.log('available exercises', this.availableExercises);
            // this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000)
            this.exerciseChanged.next(null);
        }
        ));
    }

    startExercise(selectedId: string) {
        // const exerciseDocRef = doc(this.firestore, 'availableExercises', selectedId);
        // updateDoc(exerciseDocRef, { lastSelected: new Date() })
        // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        // console.log('running exercise', this.runningExercise)
        // this.exerciseChanged.next({...this.runningExercise})
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe( ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            });
            // this.runningExercise = null;
            // this.exerciseChanged.next(null);
            this.store.dispatch(new Training.StopTraining());   
        });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe( ex => {
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            // this.runningExercise = null;
            // this.exerciseChanged.next(null);
            this.store.dispatch(new Training.StopTraining());
        });
    }

    // getRunningExercise() {
    //     return {...this.runningExercise};
    // }

    fetchCompletedOrCancelledExercises() {
        const finishedExercises = collection(this.firestore, 'finishedExercises')
        this.fbSubs.push(
            collectionData(finishedExercises).subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));    
            //this.finishedExercisesChanged.next(exercises);
            })
        )
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        const finishedExercises = collection(this.firestore, 'finishedExercises')
        addDoc(finishedExercises, exercise);
    }
}