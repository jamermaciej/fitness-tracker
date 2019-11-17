import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class SharedModule {}
