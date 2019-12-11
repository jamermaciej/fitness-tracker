import { Subscription } from 'rxjs';
import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../trainingService';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromTraining from '../store';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  exercises = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.trainingService.fetchExercises();
    this.store.select(fromTraining.getFinishedExercises);
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: Exercise[]) => {
      this.exercises.data = exercises;
    });
  }

  ngAfterViewInit() {
    this.exercises.sort = this.sort;
    this.exercises.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.exercises.filter = filterValue.trim().toLowerCase();
  }
}
