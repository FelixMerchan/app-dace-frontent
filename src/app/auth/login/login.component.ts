import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  onLogin(){
    location.href='http://localhost:4200/dashboard'
  }
  
}

