import { Component, ElementRef, ViewChild } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  
export class HomeComponent {
  @ViewChild('name') namekey!: ElementRef;
    user: User;
    public showPasswordOnPress: boolean;


    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

     
 startQuiz(){
   localStorage.setItem("name", this.namekey.nativeElement.value);
 }

}