import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})

export class ProductComponent implements OnInit {
  @Input() productName: string;
  @Output() productClicked = new EventEmitter();

  constructor(private productsService: ProductsService) {
  }
  
  ngOnInit() {  
  }


  onClicked() {
   //this.productClicked.emit(this.productName);
   this.productsService.deleteProduct(this.productName);
  }
}
