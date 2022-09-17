import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material.module';
import { TopnavComponent } from './topnav/topnav.component';

@NgModule({
  declarations: [
    TopnavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    MaterialModule,
    TopnavComponent,
  ]
})
export class SharedModule { }
