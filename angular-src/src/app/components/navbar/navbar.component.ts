import { Component, OnInit } from '@angular/core';
import {  AuthService } from '../../services/auth.service';
import {  FlashMessagesService } from 'angular2-flash-messages';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginLink: boolean;
  logoutLink: boolean;
  constructor(private _authService : AuthService,
              private _flashmessage : FlashMessagesService,
              private router: Router) {}

  ngOnInit() {


  }

  onLogoutClick() {

    this._authService.logout();
    this._flashmessage.show('Successfully Logged out, Enjoy!!!!', {
      cssClass: 'alert-success',
      timeout: 5000
    });
    this.router.navigate(['/login']);
  }

checkStatus(){
 return this._authService.loggedIn();
}




}

