import { UIService } from '../navigation/shared/ui.service';
import { Subject, Subscription, from, combineLatest } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, filter, switchMap, tap, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as fromUI from '../navigation/shared/store';
import * as fromTraining from './store';
import * as fromAuth from '../auth/store';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService implements OnDestroy {
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    exercisesFinishedChanged = new Subject<Exercise[]>();
    private fbSubscription: Subscription[] = [];
    destroySubject$: Subject<void> = new Subject();

    constructor(private db: AngularFirestore,
                private uiService: UIService,
                private router: Router,
                private store: Store<fromTraining.State>
    ) { }

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
                            calories: doc.payload.doc.data()['calories'],
                            icon: doc.payload.doc.data()['icon'],
                            iconName: doc.payload.doc.data()['iconName']
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
        combineLatest([
            this.store.select(fromTraining.getActiveTraining),
            this.store.select(fromAuth.getUser)
        ]).pipe(take(1)).subscribe(([activeTraining, user]) => {
            this.addDataToDatabase({
                ...activeTraining,
                date: new Date(),
                state: 'completed',
                userId: user.uid
            });
            this.store.dispatch(new fromTraining.StopTraining());
            this.router.navigate(['/training/new-exercise']);
        });
    }

    cancelExercise(progrss: number) {
        combineLatest([
            this.store.select(fromTraining.getActiveTraining),
            this.store.select(fromAuth.getUser)
        ]).pipe(take(1)).subscribe(([activeTraining, user]) => {
            this.addDataToDatabase({
                ...activeTraining,
                duration: activeTraining.duration * (progrss / 100),
                calories: activeTraining.calories * (progrss / 100),
                date: new Date(),
                state: 'cancelled',
                userId: user.uid
            });
            this.store.dispatch(new fromTraining.StopTraining());
            this.router.navigate(['/training/new-exercise']);
        });
    }

    fetchExercises() {
        this.store.select(fromAuth.getUser).pipe(
            filter(user => !!user),
            switchMap((user) => {
                return this.db.collection('finishedExercises', ref => ref.where('userId', '==', user.uid)).valueChanges();
            }),
            takeUntil(this.destroySubject$)
        ).subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new fromTraining.SetFinishedExercise(exercises));
        });
    }

    cancelSubscription() {
        this.fbSubscription.forEach(subs => subs.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    ngOnDestroy(): void {
        this.destroySubject$.next();
        this.destroySubject$.complete();
    }
}
