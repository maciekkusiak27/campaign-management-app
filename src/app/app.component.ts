import { Component } from '@angular/core';
import { Product } from './models/campaign.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'campaign-management-app';

  selectedProduct!: Product;

  selectedProductSubject = new Subject<Product>();

  onProductSelected(product: Product): void {
    this.selectedProduct = product;
    this.selectedProductSubject.next(product);
  }
}
