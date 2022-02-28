import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { ToastrModule } from 'ngx-toastr';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OneComponent } from './interaction/one/one.component';
import { TwoComponent } from './interaction/two/two.component';
import { ThreeComponent } from './interaction/three/three.component';
import { FourComponent } from './interaction/four/four.component';;
import { QuestionComponent } from './quiz/question/question.component'
;
import { ChangebgDirective } from './directive/changebg.directive'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule.forRoot(),
        NgbModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        OneComponent,
        TwoComponent ,
        ThreeComponent ,
        FourComponent ,
        QuestionComponent,
        ChangebgDirective
  
    ],
        
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
     //   fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };