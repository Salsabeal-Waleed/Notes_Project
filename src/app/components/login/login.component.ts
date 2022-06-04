import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serivces/auth.service';
declare var particlesJS:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  ngOnInit(): void {

    console.log(localStorage);

    particlesJS.load('particles-js', 'assets/json/particlesjs-config.json');
  }

  messageError:string = ""
  messageDone:string = ""

  loginForm : FormGroup = new FormGroup({

    email:new FormControl(null,[Validators.required , Validators.email ]) ,
    password:new FormControl(null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{5,10}$/)])
  });

  login(){
    console.log({loginFormObject:this.loginForm.value});
    this._AuthService.logInUser(this.loginForm.value).subscribe(
      (res)=>{

        console.log(res);

        if (res.message == "success") {

          localStorage.setItem('myToken' , res.token);
          this._AuthService.setUserInfo();
          this.messageDone = "Login Success";
          this._Router.navigate(['/profile']);
        } else {

          this.messageError = res.message;

        }

      },
      (error)=>{
        console.log(error);
        this.messageError = error.message
      }
    )

  }


}
