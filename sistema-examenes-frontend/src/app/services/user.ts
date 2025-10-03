import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class User {
  
  constructor(private http:HttpClient) { }

  public registerUser(user:any){
    return this.http.post(`${baseUrl}/users/sign-up`,user);
  }

}
