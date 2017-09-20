import { Injectable } from '@angular/core';
import { Http, Headers } from'@angular/http';
import  { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

authToken : any;
user : any;

  constructor(private http : Http) { }

 registerUser(user){
  let headers = new Headers();

  headers.append('Content-Type','application/json');
   return this.http.post('http://localhost:4020/users/register',user,{headers : headers}).map(res => res.json())
 }

authenticateUser(user){
let headers = new Headers();

  headers.append('Content-Type','application/json');
   return this.http.post('http://localhost:4020/users/authenticate',user,{headers : headers}).map(res => res.json())
}

getProfile() {
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-Type', 'application/json');
console.log("hitting getProfile",this.authToken);
  return this.http.get('http://localhost:4020/users/profile', {
    headers: headers
  }).map(res => res.json())
}

storeUser(token, userData) {
  localStorage.setItem('id_token', token);
  //localStorage stores only strings and not stores objects
  localStorage.setItem('user', JSON.stringify(userData));

  this.authToken = token;
  this.user = userData;
}


loadToken(){
const token = localStorage.getItem('id_token');
this.authToken =token;
}


loggedIn() {
//console.log("loggedIn value:",tokenNotExpired('id_token'))
  return tokenNotExpired('id_token');
}

logout() {

  this.authToken = null;
  this.user = null;
  localStorage.clear();
}

}

