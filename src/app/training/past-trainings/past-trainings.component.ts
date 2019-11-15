import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../trainingService';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises.data = this.trainingService.getExercises();
  }

  ngAfterViewInit() {
    this.exercises.sort = this.sort;
    this.exercises.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.exercises.filter = filterValue.trim().toLowerCase();
  }
}
