import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { StickyModule } from 'ng2-sticky-kit';

import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

import { AppComponent } from './app.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { registerLocaleData } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    ProductDetailComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StickyModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
