import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  @Input() size = 30;
  @Input() info = 'Please wait';
}
