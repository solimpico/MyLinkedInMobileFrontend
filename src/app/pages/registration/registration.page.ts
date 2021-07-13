import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  newUser: User = {} as User;
  savedUser: User = {} as User;
  success = false;
  backpage = '/home';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.success = false;
  }

  sendRegistrationRequest(): void{
      this.userService.sendRegistrationRequest(this.newUser).subscribe(user => {
        this.savedUser = user;
        this.success = true;
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 3000);
      });
  }

}
