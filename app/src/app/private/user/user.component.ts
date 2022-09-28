import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  waiting:boolean;
  photo:string;

  @Output() setAppTitle = new EventEmitter<string>();
  @Output() setAppSubTitle = new EventEmitter<string>();
  @Output() drawAlert = new EventEmitter<any>();

  constructor(private router: Router, public service: UserService){
    this.waiting = false;
  }

  ngOnInit(): void {
    this.setUser();
    Promise.resolve().then(()=>{
      this.setAppTitle.emit(this.service.name);
      this.setAppSubTitle.emit('Que bueno saber de ti');
    });
  }

  setUser(){
    const token:string = <string>localStorage.getItem('token')||'';
    const tokenSplit = token.split('.');
    const userEncode:string = <string>tokenSplit.at(1);
    const user:User = JSON.parse(atob(userEncode));
    this.service.id = user.id;
    this.service.name = user.name;
    this.service.hobby = user.hobby||0;
    //this.service.birthday = new Date(`${user.birthday} 00:00:00`);
    this.service.birthday = user.birthday;
    this.service.document = user.document;
    this.service.status = user.status;
    this.changeDocument();
  }

  changePhoto(event: Event){
    const element = event.target as HTMLInputElement;
    let photo = element.files?.item(0);
    let photoType = photo?.type;
    if(photoType !== 'image/jpeg' && photoType !== 'image/jpg' && photoType !== 'image/png'){
        this.drawAlert.emit({title:'Error', type:'danger', message:'El tipo de archivo no es una fotografía.'});
    }
    else{
      let reader = new FileReader();
          reader.readAsDataURL(<Blob>photo);
          reader.onload = (evt) => {
              let contenido:string = <string>evt.target?.result;
              let imgPhoto:HTMLImageElement = <HTMLImageElement>document.getElementById('photo');
              imgPhoto?.setAttribute('src',contenido);
              this.photo = contenido;
          }
      this.drawAlert.emit({});
    }
  }

  deletePhoto() {
    this.photo = '';
  }

  get placeHolderDocument(): string{
    let years = ((new Date).getFullYear() - new Date(`${this.service.birthday} 00:00:00`).getFullYear());
    if(years<=5){
      years = 0;
    }
    return (!years?'Documento':(years >= 18 ? 'Doc. de identidad' : 'Carnet de minoridad'));
  }

  changeDocument(){
    let document = this.service.document.replace('-','').substring(0,9);
    if(document && document.length >= 9){
      let years = ((new Date).getFullYear() - new Date(`${this.service.birthday} 00:00:00`).getFullYear());
      console.log(years)
      if(years >= 18){
        let afterUs = document.substring(0,document.length-1);
        let beforeUs = document.substring(document.length-1);
        this.service.document = `${afterUs}-${beforeUs}`;
        console.log(this.service.document)

      }
    }
  }

  onSubmit(form:NgForm){

  }

}
