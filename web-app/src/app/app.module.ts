import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatrixService } from './ventanas/Services/matrix.service';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentanasModule } from './ventanas/ventanas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MatrixComponent } from './ventanas/matrix/matrix.component';
import { LanguageInterceptor } from './ventanas/interceptors/language.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    VentanasModule,
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
     MatrixService,
     {
       provide: HTTP_INTERCEPTORS,
       useClass: LanguageInterceptor,
       multi: true
     },
     HttpClient
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

