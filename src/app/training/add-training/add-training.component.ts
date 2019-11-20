import { TrainingService } from './../trainingService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {
  addTrainingForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private trainingService: TrainingService,
              private router: Router
            ) { }

  ngOnInit() {
    this.addTrainingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.trainingService.addExercise(this.addTrainingForm.value);
    this.router.navigate(['/training/new-exercise']);
  }

}
