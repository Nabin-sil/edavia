import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, NotificationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css']
  })


export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    public showPassword: boolean;
   public showPasswordOnPress: boolean;
   emailRegex =
   '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private toastr: ToastrService

    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            email: new FormControl('',[
                Validators.required,
             
               Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
               password: new FormControl('',[
                Validators.required,
             
                Validators.minLength(6)]),
        });
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
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.showSuccess();
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.showError();
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    

showSuccess() {
    this.toastr.success('You are registered', 'Success!');
  }


  showError() {
    this.toastr.error('You are not registered', 'Error!');
  }



}