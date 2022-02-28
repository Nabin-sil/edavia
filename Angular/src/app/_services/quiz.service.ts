import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const endpoint: string = `Quiz`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class QuizService {

   // endpoint: string = `${environment.apiUrl}/Quiz`;
   // headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    
  
    // Get all Quiz
    getQuiz() : Observable<any> {
      return this.http.get("assets/questions.json");
    };
  
    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  
  }