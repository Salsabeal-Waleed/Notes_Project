import { Component } from '@angular/core';
import { AuthService } from './serivces/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notesProject';

  constructor(private _AuthService:AuthService){
      _AuthService.currentUser.subscribe(()=>{

        if (_AuthService.currentUser.getValue != null){
          setTimeout(()=>{
          _AuthService.removeUserInfo()} , 1000 * 60 * 60 *24);
        }
      });


  }
}
