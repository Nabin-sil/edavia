import { Component, OnInit } from '@angular/core';
import { InteractionService } from '@app/_services';

@Component({
  selector: 'app-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.less']
})
export class FourComponent implements OnInit {

  constructor(private interactionService: InteractionService){}
  name = 'Angular';
  user:string;
  newName:string;
  ngOnInit(){
    this.interactionService.castUser.subscribe(name => this.name = name);
  }
  editedName(name:string){
    this.interactionService.editName(this.newName);
  }
}
