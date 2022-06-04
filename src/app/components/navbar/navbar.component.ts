import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/serivces/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin : boolean = false ;

  constructor( private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(()=>{

      if (this._AuthService.currentUser.getValue()!= null) {

        this.isLogin = true ;
      } else {

        this.isLogin = false ;
      }
    });
  }

  callLogOut(){
    this._AuthService.removeUserInfo();
  }

}
