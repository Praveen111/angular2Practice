import {  Component, OnInit } from '@angular/core';
import {  AuthService } from '../../services/auth.service';
import {  ValidateService } from '../../services/validate.service';
import {  FlashMessagesService } from 'angular2-flash-messages';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(private _authService: AuthService,
    private _validateService: ValidateService,
    private _flashmessage: FlashMessagesService,
    private router: Router) {}

  ngOnInit() {}

  onSubmit() {

    const user = {
      username: this.username,
      password: this.password
    };
    console.log('Hitting onSubmit function', this.username, this.password);

    if (!this._validateService.validateLogin(user)) {
      if (user.username == undefined && user.password == undefined) {
        this._flashmessage.show('Please enter username and password', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      } else if (user.username == undefined || user.password == undefined) {
      this._flashmessage.show('Either username or password is blank', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    }

    }  else {


      this._authService.authenticateUser(user).subscribe(data => {

        if (data.success) {
          this._flashmessage.show(data.msg, {
            cssClass: 'alert-success',
            timeout: 4000
          });
          console.log(data);

          this._authService.storeUser(data.token,data.user)
          this.router.navigate(['/dashboard']);
        } else {
          console.log(data);
          this._flashmessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        }

      });


    }


  }

}
