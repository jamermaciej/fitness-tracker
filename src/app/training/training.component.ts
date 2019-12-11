import { TrainingService } from './trainingService';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromTraining from './store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  tabLinks: any[];

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {
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
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
