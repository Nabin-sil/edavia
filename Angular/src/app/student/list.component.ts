import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountService, ApiService } from '@app/_services';
import { Student } from '@app/_models';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    endpoint: string = `${environment.apiUrl}/products`;
    students:any=[];
    object:any=[];
    books:any=[];
    search: string = "";
    searchKey: any;
    spinner = false;
    totalRecords: string;
    p: number = 1;
       
    constructor(private accountService: AccountService, public http: HttpClient,
        private studentService: ApiService,
        private toastr: ToastrService
         ) {}

    ngOnInit() {
    this.getAllStudents();  
     
}



 getAllStudents() {
    this.spinner = true;
        this.studentService.getStudents().subscribe(students => {
            this.students = students;
            console.log(students);
            this.totalRecords = students.length
           this.spinner = false;

        });
    }


      deleteStudent(_id: string) {
        const student = this.students.find(x => x._id === _id);
        if (confirm('Are you sure to delete this record ?') == true) { 
            student.isDeleting = true;
            this.studentService.deleteStudent(_id)
                    .pipe(first())
            .subscribe(() =>
            this.students = this.students.filter(x => x._id !== _id));
            this.toastr.info('Student deleted');
    }
}




}