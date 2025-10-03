import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'STUDENT'){
        return true;
      }

      this.router.navigate(['login']);
      return false;
  }

}