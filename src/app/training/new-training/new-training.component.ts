import { UIService } from '../../navigation/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Exercise } from './../models/exercise.model';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../trainingService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private uiService: UIService,
              private router: Router,
              private store: Store<fromRoot.State>
            ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.fetchExercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    this.router.navigate(['/training/current-training']);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
