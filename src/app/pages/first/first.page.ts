import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {Firebase} from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  idUser = parseInt(sessionStorage.getItem('idUser'), 10);

  constructor(private utility: UtilityService,
              private firebase: Firebase) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.idUser !== parseInt(sessionStorage.getItem('idUser'), 10)) {
        location.reload(true);
      }
    }, 500);
    this.firebase.getToken().then(tok => {
      this.utility.firebaseToken.firebaseToken = tok.toString();
      this.utility.saveFirebaseToken().subscribe(() => {
        console.log('Token saved');
      });
    });
  }
}
