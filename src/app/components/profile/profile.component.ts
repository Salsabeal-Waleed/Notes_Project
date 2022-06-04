import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/serivces/auth.service';
import { NoteService } from './../../serivces/note.service';
import { Router } from '@angular/router';

declare var $:any ;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ellipsisVertical = faEllipsisVertical;


  messageErorr:string = "";
  allUserNotes:any[] = [];
  messageNOHave:string = ""

  addNewNoteForm:FormGroup = new FormGroup({
    title:new FormControl(null , [Validators.required , Validators.minLength(4) , Validators.maxLength(10) ]),
    desc : new FormControl(null , [Validators.required , Validators.minLength(25) , Validators.maxLength(100)])
  });


  editNoteForm :FormGroup = new FormGroup({
    title:new FormControl(null , [Validators.required , Validators.minLength(4) , Validators.maxLength(10) ]),
    desc : new FormControl(null , [Validators.required , Validators.minLength(25) , Validators.maxLength(100)])

  });
  constructor(private _NoteService:NoteService , private _AuthService:AuthService , private _Router: Router) { }


  ngOnInit(): void {

    this.getAllUserNotes();
    console.log(this.addNewNoteForm);

  }

  addNote(){

    //5als ana handelt myToken in authService
    // if (this._AuthService.currentUser.getValue() != null) {

    //   let objUser:any = this._AuthService.currentUser.getValue();
    //   let x = {
    //     title : this.addNewNoteForm.value.title  ,
    //     desc : this.addNewNoteForm.value.desc,
    //     NoteID: objUser._id ,
    //     token : localStorage.getItem('myToken')
    //   };
    //   console.log(objUser);
    //   console.log(x);
    //   this._NoteService.addNoteInService(x).subscribe(
    //     (res)=>{
    //       console.log(res.message);



    //     },
    //     (error)=>{

    //     }
    //   )

    // } else {
    //   console.log({message:'this not authentic user'});
    //   this.messageUser = "Plases Login befoer add Note";
    //   this._Router.navigate(['/login']);

    // }
    let objUser:any = this._AuthService.currentUser.getValue();
    let x = {
      title : this.addNewNoteForm.value.title  ,
      desc : this.addNewNoteForm.value.desc,
      userID: objUser._id ,
      token : localStorage.getItem('myToken')
    };
    console.log(objUser);
    console.log(x);
    this._NoteService.addNoteInService(x).subscribe(
      (res)=>{
        console.log(res.message);
        if (res.message == "success") {

          (<HTMLElement>document.querySelector(".succ")).style.top = '85%';
          setTimeout( ()=> {
            (<HTMLElement>document.querySelector(".succ")).style.top = '110%';
            this.resetValues();
          }, 1000 );
          this.getAllUserNotes();
        } else {
          (<HTMLElement>document.querySelector(".fail")).style.top = '85%';
          setTimeout( ()=> {
            (<HTMLElement>document.querySelector(".fail")).style.top = '110%';
            this.resetValues();
          }, 1000 );
        }

      },
      (error)=>{

        console.log(error);
        this.messageErorr = error.message;

      }
    )



  }

  resetValues(){
    this.addNewNoteForm.reset();
    $('#addNote').modal('hide');
  }


  getAllUserNotes()
  {
    this._NoteService.getAllUserNote().subscribe(
      (res)=>{

        console.log(res);
        if (res.message == "success") {

          this.allUserNotes = res.Notes;
          console.log(this.allUserNotes);
          this.messageNOHave = ""

        } else if (res.message == "no notes found"){

          this.messageNOHave = "You Dont' Have Any Notes";
          this.allUserNotes = [];
        } else {
          this.messageErorr = res.message;
        }

      } ,
      (error)=>{

        console.log(error);
        this.messageErorr = error;

      }
    )
  }

  deleteNote(id:string)
  {
    console.log(id);
     this._NoteService.deleteNoteM(id).subscribe(
       (res)=>{
         console.log(res);
         if (res.message == "deleted") {

          this.getAllUserNotes();
          this.messageErorr = ""
         } else {
          this.messageErorr = res.message;
          this.getAllUserNotes();
        }
       } ,
       (error) =>{
         console.log(error);
         this.messageErorr = error;
       }
     )
  }

  editID : string = "";

  callEdit(id:string)
  {

   let currentData = this.allUserNotes.find(note =>{
      return note._id == id
    });
    console.log(currentData);

   this.editNoteForm.controls['title'].setValue(currentData.title);
   this.editNoteForm.controls['desc'].setValue(currentData.desc);

  $('#editNote').modal('show');
    this.editID = id ;

  }
  editNote(){

    let obj = {
      title:  this.editNoteForm.value.title,
      desc : this.editNoteForm.value.desc,
      NoteID:this.editID,
      token :<string> localStorage.getItem("myToken")
    }
    console.log(obj);
    this._NoteService.updateNote(obj).subscribe(
      (res)=>{
        console.log(res);
        if (res.message == "updated") {
          (<HTMLElement>document.querySelector(".succ")).style.top = '85%';
          setTimeout( ()=> {
            (<HTMLElement>document.querySelector(".succ")).style.top = '110%';
            $('#editNote').modal('hide')
          }, 2000 );
          this.getAllUserNotes();
        } else {
          (<HTMLElement>document.querySelector(".fail")).style.top = '85%';
          setTimeout( ()=> {
            (<HTMLElement>document.querySelector(".fail")).style.top = '110%';
            $('#editNote').modal('hide')
          }, 2000 );
        }
        },
        (error)=>{
        console.log(error);
        this.messageErorr = error.message;

      }
    )

  }

}
