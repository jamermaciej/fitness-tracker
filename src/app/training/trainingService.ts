import { UIService } from '../navigation/shared/ui.service';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as fromRoot from '../store';
import * as fromUI from '../navigation/shared/store';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    exercisesFinishedChanged = new Subject<Exercise[]>();
    private fbSubscription: Subscription[] = [];

    constructor(private db: AngularFirestore,
                private uiService: UIService,
                private router: Router,
                private store: Store<fromRoot.State>
            ) {}

    fetchAvailableExercises() {
        this.store.dispatch(new fromUI.StartLoading());
        this.fbSubscription.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
              };
            });
          })
        ).subscribe((exercise: Exercise[]) => {
            this.availableExercises = exercise;
            this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(new fromUI.StopLoading());
        }, error => {
            this.store.dispatch(new fromUI.StopLoading());
            this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
            this.exercisesChanged.next(null);
        }));
    }

    addExercise(exercise: Exercise) {
        this.db.collection('availableExercises').add(exercise);
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
        this.router.navigate(['/training/new-exercise']);
    }

    cancelExercise(progrss: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progrss / 100),
            calories: this.runningExercise.calories * (progrss / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
        this.router.navigate(['/training/new-exercise']);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchExercises() {
        this.fbSubscription.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.exercisesFinishedChanged.next(exercises);
        }));
    }

    cancelSubscription() {
        this.fbSubscription.forEach(subs => subs.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
