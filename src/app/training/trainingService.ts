import { UIService } from '../navigation/shared/ui.service';
import { Subject, Subscription, from } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as fromUI from '../navigation/shared/store';
import * as fromTraining from './store';
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
                private store: Store<fromTraining.State>
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
            this.store.dispatch(new fromTraining.SetAvailableExercise(exercise));
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
        this.store.dispatch(new fromTraining.StartTraning(selectedId));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeTraining => {
            this.addDataToDatabase({
                ...activeTraining,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new fromTraining.StopTraining());
            this.router.navigate(['/training/new-exercise']); 
        });
    }

    cancelExercise(progrss: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeTraining => {
            this.addDataToDatabase({
                ...activeTraining,
                duration: activeTraining.duration * (progrss / 100),
                calories: activeTraining.calories * (progrss / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.store.dispatch(new fromTraining.StopTraining());
            this.router.navigate(['/training/new-exercise']);
        });
    }

    fetchExercises() {
        this.fbSubscription.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new fromTraining.SetFinishedExercise(exercises));
        }));
    }

    cancelSubscription() {
        this.fbSubscription.forEach(subs => subs.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
