import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private headers:HttpHeaders;
  private url:string;
  protected uri:string;
  protected http: HttpClient; 

  constructor() {
    this.setUrl(environment.pokePromeApi);
    this.setDefaultHeaders();
  }
  
  setUri(uri:string = ''):AppService{
    this.uri = uri;
    return this;
  }

  getUri():string{
    return this.uri;
  }

  setUrl(url:string = ''):AppService{
    this.url = url;
    return this;
  }

  getUrl():string{
    return this.url;
  }

  setHttp(http: HttpClient):AppService{
    this.http = http;
    return this;
  }

  getHttp(){
    return this.http;
  }

  setHeaders(headers:any = undefined):AppService{
    this.headers = new HttpHeaders(headers);
    return this;
  }

  setDefaultHeaders():AppService{
    let token: any = localStorage.getItem('token');
    this.headers = new HttpHeaders(token?{'x-token':token}:undefined);
    return this;
  }

  prepare(data:{}){
    let response = JSON.parse(JSON.stringify(data));
    delete response.uri;
    delete response.http;
    return response;
  }

  findOne(id:string){
    return this.http.get(`${this.url}/${this.uri}/${id}`,{headers:this.headers});
  }

  findAll(data:{}){
    let searchData = new URLSearchParams(data);
    return this.http.get(`${this.url}/${this.uri}?${searchData}`,{headers:this.headers});
  }

  save(data:any = null){
    return this.http.post(`${this.url}/${this.uri}`, this.prepare(data||this),{headers:this.headers});
  }
  
  update(id:any = null,data:any = null){
    return this.http.put(`${this.url}/${this.uri}/${id}`, this.prepare(data||this),{headers:this.headers});
  }
  
  delete(id:number){
    return this.http.delete(`${this.url}/${this.uri}/${id}`,{headers:this.headers});
  }

}
