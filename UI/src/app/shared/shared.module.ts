import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog'; 

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MatDialogModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [
  
  ],
})
export class SharedModule { }
