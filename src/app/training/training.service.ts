import { Subject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { Store } from "@ngrx/store";
import { Firestore, collectionSnapshots, collection, collectionData, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject, Injectable } from "@angular/core";
import { UIService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';


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
        private store: Store<fromRoot.State>
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
            this.availableExercises = exercises;
            console.log('available exercises', this.availableExercises);
            this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000)
            this.exerciseChanged.next(null);
        }
        ));
    }

    startExercise(selectedId: string) {
        const exerciseDocRef = doc(this.firestore, 'availableExercises', selectedId);
        updateDoc(exerciseDocRef, { lastSelected: new Date() })
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
        this.fbSubs.push(
            collectionData(finishedExercises).subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
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