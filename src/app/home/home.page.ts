import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {InputLogin} from '../models/inputLogin';
import {UserService} from '../services/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  visiblePosts: Post[] = [];
  inputLogin: InputLogin = {} as InputLogin;
  applOrOff = true;
  auth = true;


  constructor(private router: Router, private postService: PostService,
              private userService: UserService, private geolocation: Geolocation) {}

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('idUser', '');
    this.geolocation.getCurrentPosition().then((resp) => {
      sessionStorage.setItem('lat', String(resp.coords.latitude));
      sessionStorage.setItem('long', String(resp.coords.longitude));
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.inputLogin.password = '';
    this.inputLogin.email = '';
    this.applOrOff = true;
    this.auth = true;
    this.postService.getVisiblePost().subscribe(posts => {
      this.visiblePosts = posts;
    });
  }

  sendCredential(): void{
    this.userService.sendCredential(this.inputLogin).subscribe((tok) => {
      if (tok.token !== null) {
        this.userService.findById(tok.userId).subscribe(user => {
          if (user.role === 'Applicant' || user.role === 'Offeror') {
            sessionStorage.setItem('token', tok.token);
            sessionStorage.setItem('idUser', String(tok.userId));
            localStorage.setItem('token', tok.token);
            localStorage.setItem('idUser', String(tok.userId));
            this.router.navigateByUrl('first');
          } else {
            this.applOrOff = false;
          }
        });
      } else {
        this.auth = false;
      }
    });
  }
}
