import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixComponent } from './matrix/matrix.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselComponent } from './carousel/carousel.component';
import { VideoComponent } from './video/video.component';
import { VentanasRoutingModule } from './ventanas-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MatrixComponent,
    NavComponent,
    CarouselComponent,
    VideoComponent
  ],
  imports: [
    VentanasRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  exports: [
    MatrixComponent,
  ],
})
export class VentanasModule { }
