import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductFormService } from '../product-form.service';
import { Product } from '../models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public product: undefined | Product;
  public productForm: undefined | FormGroup; // todo: cannot be undefined!
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly productFormService: ProductFormService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.isLoading = true;
        
    this.productService.getProductById(id).pipe(take(1)).subscribe((product: Product) => {
      this.isLoading = false;
      this.product = product;
      this.productForm = this.productFormService.createFormGroupFromProduct(this.product);
    });
  }

  get formControls() {
    return this.productForm.controls;
  }

  public onSubmit(): void {
    const { userid } = this.product;
    const updatedProduct = this.productFormService.getProductFromForm(this.productForm);
    
    this.isLoading = true;
    
    this.productService.update(userid, updatedProduct).subscribe((created: boolean) => {
      if (created) {
        this.isLoading = false;
        this.router.navigateByUrl('/products');
        return;
      }

      // otherwise handle error
    });
  }
}
