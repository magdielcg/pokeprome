import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from './services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title:string = '';
  subtitle:string = '';
  
  actualComponentName: string;
  
  alert:any = {
    type:'',
    title:'',
    message:''
  };
  
  constructor(private router: Router){

  }

  ngOnInit():void{
    this.setDefaultTitles();
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
      if(!document.querySelector('router-outlet + *')){
        this.router.navigate(['/']);
      }
    },1000)
  }
  
  setAppTitle(title:string){
    this.title = title;
  }

  setAppSubTitle(subtitle:string){
    this.subtitle = subtitle;
  }

  setDefaultTitles(){
    this.setAppTitle('Te damos al bienvenida a PromePoke');
    this.setAppSubTitle('Elige una opción');
  }

  drawAlert(alert:any){
    this.alert = alert;
  }

  onActivate(component: any){
    if(['/','/login','/register'].includes(this.router.url) && (new Permissions).canActivate()){
      this.router.navigate(['/user']);
    }
    const self = this;
    for(const method in component){
      if(component[method] instanceof EventEmitter){
        const event = component[method];
        event.subscribe(((data:any)=>{
          self.emitEvents(method,data);
        }));
      }
    }
  }

  onDeactivate(component: any){
    this.setDefaultTitles();
  }

  emitEvents(eventName:string, data:any){
    switch (eventName) {
      case 'drawAlert':
        this.drawAlert(data);
        break;
      case 'setAppTitle':
        this.setAppTitle(data);
        break;
      case 'setAppSubTitle':
        this.setAppSubTitle(data);
        break;
      default:
        break;
    }
  }
}
