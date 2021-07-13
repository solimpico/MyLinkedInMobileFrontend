import { Component } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import {UtilityService} from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private firebase: Firebase, private utility: UtilityService) {
    this.initializeApp();
  }

  initializeApp() {
    // get FCM token
    this.firebase.getToken().then(token => {
      this.utility.firebaseToken.firebaseToken = token.toString();
      console.log('TOKEN SALVATO: '+this.utility.firebaseToken.firebaseToken);
      localStorage.setItem('firebaseToken', token);
      console.log(token);
    });

    // ionic push notification example
    this.firebase.onNotificationOpen().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });

    // refresh the FCM token
    this.firebase.onTokenRefresh().subscribe(token => {
      this.utility.firebaseToken.firebaseToken = token.toString();
      console.log('TOKEN SALVATO: '+this.utility.firebaseToken.firebaseToken);
      localStorage.setItem('firebaseToken', token);
      console.log(token);
    });
  }
}
