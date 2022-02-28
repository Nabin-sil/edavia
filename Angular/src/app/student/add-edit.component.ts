import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, ApiService} from '@app/_services';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private studentService: ApiService,
        private alertService: AlertService,
        private toastr: ToastrService

    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: new FormControl('',[
                Validators.required,
             
               Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            phone: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.studentService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
                console.log(this.form.value);
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createStudent();
        } else {
            this.updateStudent();
        }
    }

    private createStudent() {
        this.studentService.addStudent(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                 this.toastr.success('Student Added');

                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateStudent() {
        this.studentService.updateStudent(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                 next: () => {
                 this.toastr.success('Student Updated');
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.toastr.error('Error');
                 //   this.alertService.error(error);
                    this.loading = false;
                }
            });
    }





}