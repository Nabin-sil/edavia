import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })

export class ProfileComponent implements OnInit {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }


    ngOnInit(): void {
      
     
    }
    
    


}