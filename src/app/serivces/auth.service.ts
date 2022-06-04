import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = "https://route-egypt-api.herokuapp.com/"

  constructor(private _HttpClient:HttpClient , private _Router:Router) {

    if (localStorage.getItem('myToken')!= null) {

      this.setUserInfo();
    }
   }

   currentUser = new BehaviorSubject(null);

  setUserInfo():void{

    let decodedToken = JSON.stringify(localStorage.getItem('myToken'));
    let encodeToken :any = jwtDecode(decodedToken);
    this.currentUser.next(encodeToken)
    console.log(this.currentUser);
  }

  removeUserInfo():void
  {

    localStorage.removeItem('myToken');
    this.currentUser.next(null);
    this._Router.navigate(['/login']);
  }

  registerNewUser(obj:any):Observable<any>
  {

   return this._HttpClient.post(`${this.baseUrl}signup` , obj);

  }

  logInUser(obj:any):Observable <any>
  {

    return this._HttpClient.post(`${this.baseUrl}signin` , obj)
  }
}
