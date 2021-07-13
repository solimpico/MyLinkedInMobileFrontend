import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  allNotifications: Notification[] = [];
  backPage = '../first';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getAllNotification().subscribe(nots => {
      this.allNotifications = nots;
    });
    setTimeout(() => {
      this.notificationService.getAllNotification().subscribe(nots => {
        this.allNotifications = nots;
      });
    },10000);
  }

  deleteNotification(notific: Notification): void{
    this.notificationService.deleteNotificationById(notific.id).subscribe(() => {
      this.allNotifications.splice(this.allNotifications.indexOf(notific, 1));
      location.reload(true);
    });
  }

  deleteAllNotification(): void{
    this.notificationService.deleteAllNotification().subscribe(() => {
      this.allNotifications = [];
    });
  }

}
