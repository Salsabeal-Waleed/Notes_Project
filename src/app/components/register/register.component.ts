import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serivces/auth.service';
declare var particlesJS:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  ngOnInit(): void {

    particlesJS.load('particles-js', 'assets/json/particlesjs-config.json');

  }
  errorMsg:string = "";
  registerDone:string = "";

  registerForms:FormGroup = new FormGroup({

    first_name:new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    last_name:new FormControl(null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    age:new FormControl(null ,[Validators.required , Validators.min(18) , Validators.max(80)]),
    email:new FormControl(null ,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required , Validators.pattern(/^[a-zA-Z0-9]{5,10}$/)])

  });

  register(){
    console.log({registerFormObject:this.registerForms.value});
    this._AuthService.registerNewUser(this.registerForms.value).subscribe(
      (res)=>{console.log(res);
        if (res.message == "success") {

          this.registerDone = "Register Success";
          this._Router.navigate(['/login']);
        } else {

          this.errorMsg= res.message;
          console.log(res.message);

        }

      },//response
      (error)=>{
        console.log(error);
        this.errorMsg = error.message;
      }// error link false
      // ()=>{}// complate after any of aonther two method

    )


  }

}
