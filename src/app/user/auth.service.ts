import { Injectable } from '@angular/core';
import { User } from './user';
import { MessageService } from '../message/message.service';
@Injectable({
  providedIn:'root'
})
export class AuthService{

  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private messageService: MessageService){}


  login(userName:string, password:string): void {
    if(!userName || !password){
      this.messageService.addMessage('Please enter your username and password');
      return;
    }
    
    if(userName === 'admmin'){
      this.currentUser = {
        id:1,
        userName,
        isAdmin:true
      }
      this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
       return;
      }

       this.currentUser = {
        id:2,
        userName,
        isAdmin:false
      }
      this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
       return;

    }

    logout(): void {
      this.currentUser = null;
    }
  }
  


