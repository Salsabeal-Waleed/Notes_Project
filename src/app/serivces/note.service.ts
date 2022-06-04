import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/serivces/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl:string = "https://route-egypt-api.herokuapp.com/"
  constructor(private _HttpClient:HttpClient ,private _AuthService:AuthService) { }

   objUser:any = this._AuthService.currentUser.getValue();
   id = this.objUser._id;
   token = localStorage.getItem('myToken');
   obj = {Token:<string>this.token , userID:this.id };


 //post
  addNoteInService(obj:any):Observable<any>
  {

    return this._HttpClient.post(`${this.baseUrl}addNote` , obj);
  }
 //get
  getAllUserNote():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}getUserNotes` , { headers: this.obj})
  }
 //delete
  deleteNoteM(id:string):Observable<any>
  {

    return this._HttpClient.delete(`${this.baseUrl}deleteNote` , { body : {token:this.token , NoteID:id}} )
  }

  //update
  updateNote(obj:any):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}updateNote` , obj);
  }



}
