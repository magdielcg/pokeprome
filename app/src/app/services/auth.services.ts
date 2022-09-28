import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export class Permissions {
  canActivate(): boolean {
    const logged:boolean = localStorage.getItem('logged') === "true";
    const token:string = <string>localStorage.getItem('token')||'';
    const tokenSplit = token.split('.');
    let tokenIsValid = tokenSplit.length === 3;
    if(tokenIsValid){
      tokenSplit.forEach((position,i)=>{
        if(i <= 1 && tokenIsValid){
          try {
            JSON.parse(atob(position));
          } catch (error) {
            tokenIsValid = false;
          }
        }
      });
    }

    return logged && tokenIsValid;
  }
}

@Injectable()
export class AuthServices implements CanActivate {
  constructor(private permissions: Permissions) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.permissions.canActivate();
  }
}