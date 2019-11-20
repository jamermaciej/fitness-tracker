import { CurrentTrainingComponent } from './current-training/current-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes: Routes = [
    { path: '', component: TrainingComponent,
        children: [
            { path: 'new-exercise', component:  NewTrainingComponent},
            { path: 'current-training', component: CurrentTrainingComponent},
            { path: 'past-exercises', component:  PastTrainingsComponent},
            { path: 'add-exercise', component: AddTrainingComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule {}
