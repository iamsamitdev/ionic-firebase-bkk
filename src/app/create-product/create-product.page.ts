import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductServiceService } from './../shared/product-service.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  productForm: FormGroup;
  isSubmitted = false;

  constructor(
    private prdService: ProductServiceService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      desc: ['', [Validators.required]],
      price: ['', [Validators.required]],
      qty: ['', [Validators.required]]
    });
  }

  formSubmit() {
    this.isSubmitted = true;
    if (!this.productForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      // console.log(this.productForm.value)
      this.prdService.createProduct(this.productForm.value).then(res => {
        // console.log(res);
        this.productForm.reset();
        // this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

  get errorControl() {
    return this.productForm.controls;
  }

}
