import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Student } from '@app/_models';


const apiUrl = 'http://localhost:3000/student';

//const strapiendpoint: string = `http://localhost:1337/api`;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor( private http: HttpClient) { }


   // Add Student
   addStudent(data: Student): Observable<any> {
    let API_URL = `${environment.apiUrl}/student/add`;
    return this.http.post(API_URL, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  
    // Get all Students
    getStudents(): Observable<any> {
      return this.http.get(`${environment.apiUrl}/student`, httpOptions);
    }
  


    getById(id: string) {
      return this.http.get<Student>(`${environment.apiUrl}/student/${id}`);
  }


    // Update Student
    updateStudent(id:string, data: any): Observable<any> {
      let API_URL = `${environment.apiUrl}/student/${id}`;
      return this.http.patch(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete student
    deleteStudent(id: string) {
      var API_URL = `${environment.apiUrl}/student/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }




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


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }



}


