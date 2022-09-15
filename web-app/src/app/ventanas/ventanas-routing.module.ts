import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixComponent } from './matrix/matrix.component';
import { VideoComponent } from './video/video.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'matrix', component: MatrixComponent},
            { path: 'video', component: VideoComponent},
            { path: '**', redirectTo: 'matrix'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VentanasRoutingModule { }