import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Login } from '../login/login.model';
import { LoginService } from '../login/login.service';

enum RegisterSteps {
  INIT = 0,
  ASSOC = 1
};

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {


  step:RegisterSteps = RegisterSteps.INIT;
  waiting:boolean;

  photo:string;

  @Output() setAppTitle = new EventEmitter<string>();
  @Output() setAppSubTitle = new EventEmitter<string>();
  @Output() drawAlert = new EventEmitter<any>();

  constructor(private router: Router, public service: UserService){
    this.waiting = false;
  }

  ngOnInit(): void {
    Promise.resolve().then(()=>{
      this.setAppTitle.emit('Configuremos tu perfil');
      this.setAppSubTitle.emit('Queremos conocerte mejor');
    });
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

  onSubmit(form:NgForm){
    let years = ((new Date).getFullYear() - new Date(`${this.service.birthday} 00:00:00`).getFullYear()), ok: boolean = false;
    if(!this.photo){
      this.drawAlert.emit({title:'Alerta!', type:'warning', message:'Es obligatorio cargar una fotografía.'})
    }
    else if(!this.service.name){
      this.drawAlert.emit({title:'Alerta!', type:'warning', message:'El campo *Nombre* no puede estar vacío.'})
    }
    else if(!this.service.birthday || years <= 5 || isNaN(years)){
      this.drawAlert.emit({title:'Alerta!', type:'warning', message:'Debes ser mayor a 5 años para poder registrarte.'})
    }
    else if (!this.service.document){
      this.drawAlert.emit({title:'Alerta!', type:'warning', message:`El campo *${this.placeHolderDocument}* no puede estar vacío.`})
    }
    else if (years>= 18){
      this.changeDocument();
      ok = this.service.document.length === 10;
      if(!ok){
        this.drawAlert.emit({title:'Alerta!', type:'warning', message:`El valor del campo *${this.placeHolderDocument}* no es correcto.`})
      }
    }
    else{
      ok = true;
    }
    if(ok){
      this.waiting = true;
      this.drawAlert.emit({});
      this.service.document = this.service.document.replace('-','');
      this.service.hobby = this.service.hobby||undefined;
      this.service.save({...<User>this.service}).subscribe(res=>{
        let response:any = {...res};
        let records:Array<User> = response.records||[];
        const user:User = <User>records.at(0);
        const loginService:LoginService = new LoginService(this.service.getHttp());
        loginService.birthday = this.service.birthday;
        loginService.document = this.service.document;
        loginService.save({...<Login>loginService}).subscribe(res=>{
          let response:any = {...res};
          let records:Array<any> = response.records||[];
          let {token} = records.at(0);
          localStorage.setItem("logged","true");
          localStorage.setItem("token",token);
          Promise.resolve().then(()=>{
            this.router.navigate(['/user']);
          });
        },err=>{
          console.log(err);
          this.waiting = false;
          this.drawAlert.emit({type: 'danger',title: 'Error',message: 'Al comunicarse al servidor, compruebe los datos e intente de nuevo.'});
        });
      },
      err=>{
        console.log(err);
        this.waiting = false;
        this.drawAlert.emit({type: 'danger',title: 'Error',message: 'Al comunicarse al servidor, compruebe los datos e intente de nuevo.'});
      });
    }
  }

}
