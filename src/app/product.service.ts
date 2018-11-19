import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Product } from './models';

declare function require(name: string);
const products = require('../dummy-data/data.json');

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: undefined | Product[];
  
  public getProducts(config?: {offset?:number, limit?: number}): Observable<{products: Product[], hasMore: boolean}> {
    this.products = this.products || products;
    let _products = this.products;
    
    if (config && config.offset) {
      _products = this.products.slice(config.offset);
    }

    if (config && config.limit) {
      _products = _products.slice(0, config.limit - 1);
    }

    return timer(1500).pipe( // pretend like there is some latency
      flatMap(() => {
        return of({
          products: _products, 
          // compare the userid of the last selected product to the one of the last of all products
          hasMore: _products[_products.length - 1].userid !== this.products[this.products.length - 1].userid,
        });
      }),
    );
  }

  public getProductById(id: string): Observable<Product> {
    this.products = this.products || products;
    const product = this.products.find((product: Product) => product.userid === id);
    
    // return timer(1500).pipe(
    //   flatMap(() => of(product)),
    // ); 
    return of(product);
  }

  public update(id: string, data: {}): Observable<boolean> {
    this.products = this.products || products;
    let product = this.products.find((product: Product) => product.userid === id);
    let index = this.products.findIndex((product: Product) => product.userid === id);
    
    if (!product || index === -1) {
      return timer(1500).pipe(
        flatMap(() => of(false)),
      );
    }
    
    this.products[index] = Object.assign({}, product, data);
    
    return timer(1500).pipe(
      flatMap(() => of(true)),
    );
  }

  /* ... */
}
