import { TrainingService } from './trainingService';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;
  tabLinks: any[];

  constructor(private trainingService: TrainingService) {
    this.tabLinks = [
      {
          label: 'New exercise',
          link: 'new-exercise',
      },
      {
          label: 'Past exercise',
          link: 'past-exercises'
      },
      {
          label: 'Add exercise',
          link: 'add-exercise'
      }
    ];
  }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      this.ongoingTraining = exercise ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
