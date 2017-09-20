import {
  Component,
  OnInit
} from '@angular/core';
import {
  ValidateService
} from '../../services/validate.service';
import {
  AuthService
} from '../../services/auth.service';
import {
  FlashMessagesService
} from 'angular2-flash-messages';
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private _authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  onRegister() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      const msg = 'Please fill in all fields';
      this.flashMessage.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 1000
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please use valid email", {
        cssClass: 'alert-danger',
        timeout: 1000
      });
      return false;
    }

    //register the user
    this._authService.registerUser(user).subscribe(data => {
      if (data.success == true) {

        this.flashMessage.show('Successfully registered', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/login']);
      } else {

        this.flashMessage.show('Something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000
        });

        this.router.navigate(['/register']);
      }

    })
  }


}
