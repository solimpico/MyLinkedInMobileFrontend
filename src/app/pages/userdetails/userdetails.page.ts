import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Skil} from '../../models/skil';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {SkilService} from '../../services/skil.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {

  user: User = {} as User;
  skilList: Skil[] = [];
  backpage = '../../post';
  defaultImage = 'http://localhost:8080/public/download/generico.jpg';

  constructor(private userService: UserService, private activateRoute: ActivatedRoute, private skilService: SkilService) { }

  ngOnInit() {
    let userId: any = 0;
    userId = this.activateRoute.snapshot.paramMap.get('userId');
    this.userService.findById(parseInt(userId, 10)).subscribe(user => {
      this.user = user;
      if (user.role === 'Applicant'){
        user.skilIdArray?.forEach((idSkil) => {
          this.skilService.getSkilById(idSkil).subscribe(skil => {
            this.skilList.unshift(skil);
          });
        });
      }
    });
  }

}
