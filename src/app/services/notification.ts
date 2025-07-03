import { Injectable } from '@angular/core';
import { NotificationData } from '@models/notification.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private showNotificationSubject = new BehaviorSubject<boolean>(false);
  showNotification$: Observable<boolean> =
    this.showNotificationSubject.asObservable();

  public notificationSubject = new BehaviorSubject<NotificationData>({
    type: 'error',
    message: '',
    show: false,
  });

  showNotification(
    type: 'success' | 'error',
    message: string
  ) {
    this.notificationSubject.next({ type, message, show: true });
  }

  hideNotification() {
    this.notificationSubject.next({
      ...this.notificationSubject.value,
      show: false,
    });
  }
}
