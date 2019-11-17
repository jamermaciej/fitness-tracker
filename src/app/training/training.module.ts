import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from './../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AngularFirestoreModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
