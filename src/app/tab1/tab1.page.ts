import { Component } from '@angular/core';
import { ProductModel } from '../shared/ProductModel';
import { ProductServiceService } from './../shared/product-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Products = [];

  constructor(private prdService: ProductServiceService) {}

  ngOnInit() {
    this.fetchProduct();
    let productRes = this.prdService.getProductList();
    productRes.snapshotChanges().subscribe(res => {
      this.Products = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Products.push(a as ProductModel);
      })
    })
  }

  fetchProduct() {
    this.prdService.getProductList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteProduct(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.prdService.deleteProduct(id)
    }
  }



}
