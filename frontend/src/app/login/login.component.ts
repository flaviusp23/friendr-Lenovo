import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''; // sau aceeasi chestie cu username! : string
  password: string = '';
  loading = false;
  constructor(private router: Router, private appService:AppService){
    const username = localStorage.getItem('username');// ngOnInit se apeleaza dupa constructor
    if(username)
        this.username = username;
  }
  signIn(){
    this.loading = true;
    // const subscription = this.appService
    this.appService
    .login(this.username,this.password)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('username',this.username);
        localStorage.setItem('firstName',response.firstName);
        localStorage.setItem('lastName',response.lastName);
        localStorage.setItem('pictureUrl',response.pictureUrl)
        this.router.navigate(['homepage']);
      },
      error:(error) => {
        this.loading = false;
        alert("Invalid username or password")
      }
    });
    // subscription.unsubscribe();// asta cu const subscription si unsubscribe e o varianta echivalenta cu .pipe(first()). Ori una ori alta
  }
}
