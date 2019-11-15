import { NgForm } from '@angular/forms';
import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../trainingService';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  @Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingStart.emit();
  }

}
