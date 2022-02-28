import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class InteractionService{
  constructor(){}
  private name = new BehaviorSubject<string>('Suresh');
  castUser = this.name.asObservable();
  
  editName(newName){
    this.name.next(newName); 
  }
}