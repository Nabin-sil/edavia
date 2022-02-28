import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { ToastrService } from 'ngx-toastr';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService,
       private toastr: ToastrService
       ) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();

    }


    navbarCollapsed = true;
 
    toggleNavbarCollapsing() {
        this.navbarCollapsed = !this.navbarCollapsed;
    }


    
showSuccess() {
    this.toastr.info('You are logout', 'Success!');
  }


  showError() {
    this.toastr.error('You are not logout', 'Error!');
  }


}