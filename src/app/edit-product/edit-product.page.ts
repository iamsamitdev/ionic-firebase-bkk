import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductServiceService } from './../shared/product-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

  updateProductForm: FormGroup;
  id: any;

  constructor(
    private prdService: ProductServiceService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.prdService.getProduct(this.id).valueChanges().subscribe(res => {
      this.updateProductForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      name: [''],
      desc: [''],
      price: [''],
      qty: ['']
    })
    console.log(this.updateProductForm.value)
  }

  updateForm() {
    this.prdService.updateProduct(this.id, this.updateProductForm.value)
      .then(() => {
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(error => console.log(error));
  }

}
