import { UIService } from '../../navigation/shared/ui.service';
import { Observable } from 'rxjs';
import { Exercise } from './../models/exercise.model';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../trainingService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromTraining from '../store';
import * as fromRoot from '../../store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private uiService: UIService,
              private router: Router,
              private store: Store<fromTraining.State>
            ) { }

  ngOnInit() {
    this.fetchExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    this.router.navigate(['/training/current-training']);
  }
}
