import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Product } from '../models/campaign.model';
import { mockInitialProductData } from '../mock/mock.data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = mockInitialProductData;

  productForm!: FormGroup;

  ngOnInit() {
    this.productForm = new FormGroup({
      selectedProductId: new FormControl('1'),
    });
    this.onProductSelected();
  }

  onProductSelected(): void {
    const selectedProduct = this.products.find(
      (product) => product.id === this.productForm.value.selectedProductId
    );
    this.productSelected.emit(selectedProduct);
  }
}
