import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '@services/notification';

@Component({
  selector: 'app-notification',
  imports: [MatIcon, CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class Notification implements OnInit, OnDestroy {
  type: 'success' | 'error'  = 'error';
  message: string = '';
  showNotification!: boolean;

  private destroy$ = new Subject<void>();

  private notificationService = inject(NotificationService);

  @Output() notificationClose = new EventEmitter<void>();
  private timeoutId!: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.notificationService.notificationSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.type = data.type;
        this.message = data.message;
        this.showNotification = data.show;

        if (data.show) {
          this.startAutoHideTimer();
        }
      });
  }

  startAutoHideTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.onCancel();
    }, 5000);
  }

  onCancel() {
    this.notificationService.hideNotification();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
