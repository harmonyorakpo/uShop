import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationService } from './notification';

describe('Notification', () => {
  let component: NotificationService;
  let fixture: ComponentFixture<NotificationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationService],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
