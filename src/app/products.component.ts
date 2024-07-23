import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './app.component.css',
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'A Book';
  isDisabled = true;
  products = [];
  private productsSubscription: Subscription;

  constructor(private productsService: ProductsService) {
    //this.products = this.productsService.getProducts();
    setTimeout(() => {
        this.isDisabled = false;
    }, 3000)
  }

  ngOnInit(): void {
      this.products = this.productsService.getProducts();
      this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
        this.products = this.productsService.getProducts();
      })
  }

  onAddProduct(form){
    //this.products.push(this.productName);
    if (form.valid) {
        this.productsService.addProduct(form.value.productName)
    }
  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }
  
  ngOnDestroy(): void {
      this.productsSubscription.unsubscribe();
  }
}
