import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        MatTableModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    exports: [
        MatTableModule,
        MatTooltipModule,
        MatMenuModule
    ],
    providers:
        [
            
        ]
})

export class MaterialModule { }