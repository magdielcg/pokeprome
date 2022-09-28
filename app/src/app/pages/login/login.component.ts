import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { LoginService } from './login.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  get placeHolderDocument(): string{
    let years = ((new Date).getFullYear() - new Date(`${this.service.birthday} 00:00:00`).getFullYear());
    if(years<=5){
      years = 0;
    }
    return (!years?'Documento':(years >= 18 ? 'Doc. de identidad' : 'Carnet de minoridad'));
  }
  
  @Output() setAppTitle = new EventEmitter<string>();
  @Output() setAppSubTitle = new EventEmitter<string>();
  @Output() drawAlert = new EventEmitter<any>();

  waiting: boolean = false;

  constructor(private router: Router, public service: LoginService) { }

  ngOnInit(): void {
    this.setAppTitle.emit('Inicia sesión');
    this.setAppSubTitle.emit('Por favor llena el siguiente formulario');
  }

  changeDocument(){
    let document = this.service.document.replace('-','').substring(0,9);
    if(document && document.length >= 9){
      let years = ((new Date).getFullYear() - new Date(`${this.service.birthday} 00:00:00`).getFullYear());
      if(years >= 18){
        let afterUs = document.substring(0,document.length-1);
        let beforeUs = document.substring(document.length-1);
        this.service.document = `${afterUs}-${beforeUs}`;
      }
    }
  }
  
  onSubmit(form:NgForm){
    let years = ((new Date).getFullYear() - new Date(`${this.service.birthday} 00:00:00`).getFullYear()), ok: boolean = false;
    if(!this.service.birthday || years <= 5 || isNaN(years)){
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
      this.service.save({...<Login>this.service}).subscribe(res=>{
        let response:any = {...res};
        let records:Array<any> = response.records||[];
        let {token} = records.at(0);
        localStorage.setItem("logged","true");
        localStorage.setItem("token",token);
        Promise.resolve().then(()=>{
          this.router.navigate(['/user']);
        });
      },err=>{
        let error = (err.error||{}).description;
        this.waiting = false;
        this.drawAlert.emit({type: 'danger',title: 'Error',message: error||'Al comunicarse al servidor, compruebe los datos e intente de nuevo.'});
      });
    }
  }
}
