import { Exercise } from './../models/exercise.model';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../trainingService';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore
            ) { }

  ngOnInit() {
    this.exercises = this.db
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
                        );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
