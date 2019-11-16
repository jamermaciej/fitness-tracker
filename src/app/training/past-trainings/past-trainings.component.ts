import { Subscription } from 'rxjs';
import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../trainingService';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  exercises = new MatTableDataSource<Exercise>();
  exercisesFinishedSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchExercises();
    this.exercisesFinishedSubscription = this.trainingService.exercisesFinishedChanged.subscribe((exercises: Exercise[]) => {
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

  ngOnDestroy() {
    this.exercisesFinishedSubscription.unsubscribe();
  }
}
