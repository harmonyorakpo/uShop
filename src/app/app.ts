import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Notification } from '@components//notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Notification],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'solankee-shopping-cart';
}
