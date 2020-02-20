import { TrainingService } from './../trainingService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {
  addTrainingForm: FormGroup;
  selectedFiles: FileList;
  uploadProgress: number;
  downloadURL: Observable<string>;
  fileName = '';
  exercise;
  disabledProgress = false;

  constructor(private formBuilder: FormBuilder,
              private trainingService: TrainingService,
              private router: Router,
              private afStorage: AngularFireStorage
            ) { }

  ngOnInit() {
    this.addTrainingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.exercise = {
      ...this.addTrainingForm.value,
      icon: this.downloadURL ? this.downloadURL : '',
      iconName: this.fileName
    };
    this.trainingService.addExercise(this.exercise);
    this.router.navigate(['/training/new-exercise']);
  }

  uploadFile() {
    const filePath = `uploads/${this.fileName}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, this.selectedFiles);

    task.percentageChanges().subscribe((value) => {
      this.uploadProgress = value;
      this.disabledProgress = value !== 100 ? true : false;
    });
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
          });
        })
    ).subscribe(() => {});
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

}
