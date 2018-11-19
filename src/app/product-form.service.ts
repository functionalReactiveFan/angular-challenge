import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  public createFormGroupFromProduct(product: Product): FormGroup { // todo: move form logic out of the component!!!
    const {camp_cpc, date, freeclick, network, PlistaProduct} = product;
    const [_date, _time] = date.split('T');

    return this.fb.group({
      camp_cpc: [camp_cpc.toFixed(2), Validators.required],
      date: [_date, Validators.required],
      time: [_time.slice(0, _time.length - 3), Validators.required],
      freeclick,
      network,
      PlistaProduct: [PlistaProduct, Validators.required],
    });
  }

  public getProductFromForm(form: FormGroup): Product {
    const value = form.value;
    const {date, time} = value;
    const newDate = `${date}T${time}:00`;
    delete value.time;

    return Object.assign({}, value, {date: newDate});
  }
}
