import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/auth/generate-token`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public isLoggedIn() {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('token') !== null;
  }
  return false;
}


  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    const userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/auth/current-user`);
  }
}
