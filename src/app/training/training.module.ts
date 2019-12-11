import { TrainingRoutingModule } from './training-routing.module';
import { SharedModule } from './../navigation/shared/shared.module';
import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent,
        AddTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', reducers)
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
