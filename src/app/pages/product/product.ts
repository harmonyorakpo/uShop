import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '@components//header/header';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule, Header ],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {}
