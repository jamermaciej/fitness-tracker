import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../trainingService';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  exercises = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises.data = this.trainingService.getExercises();
  }

}
