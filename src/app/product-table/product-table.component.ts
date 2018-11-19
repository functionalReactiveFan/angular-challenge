import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { Product } from '../models';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  public products: Product[] = [];
  public isLoading: boolean = false;
  private offset: number = 0;
  private limit: number = 10;
  private hasMoreProducts = true;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
  ) {}

  public ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.isLoading = true;
    this.productService.getProducts({
      limit: this.limit,
      offset: this.offset,
    }).pipe(take(1)).subscribe((data: {products: Product[], hasMore: boolean}) => {
      this.isLoading = false;
      this.products = this.products.concat(data.products);
      this.hasMoreProducts = data.hasMore;

      if (this.hasMoreProducts) {
        this.offset += this.limit;
      }
    });
  }

  public loadMore(): void {
    this.loadProducts();
  }

  public selectProduct(userid) {
    this.router.navigateByUrl(`/products/${userid}`);
  }
}
