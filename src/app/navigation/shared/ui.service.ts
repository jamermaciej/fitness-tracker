import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

export class UIService {

    constructor(private snackBar: MatSnackBar) {}

    loadingStateChanged = new Subject<boolean>();

    showSnackbar(message: string, actions: any, duration: number) {
        this.snackBar.open(message, actions, {
            duration
        });
    }
}
