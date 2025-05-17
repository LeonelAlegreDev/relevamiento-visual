import { CommonModule } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { INotification } from '../../interfaces/i-notification';

@Component({
  selector: 'ns-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.css'],
  imports: [
    CommonModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class NotificationPopupComponent implements OnInit {
  public notifications: INotification[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public pushNotification(notification: INotification): void {
    this.notifications.push(notification);
  }

  // PREVENT INTERACTION WITH THE BACK LAYER
  public onOverlayDummyTouch(): void {
  }

  public closeNotification(notification: INotification): void {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}

