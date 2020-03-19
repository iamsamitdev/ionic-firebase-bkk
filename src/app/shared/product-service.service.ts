import { Injectable } from "@angular/core";
import { ProductModel } from "../shared/ProductModel";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
@Injectable({
  providedIn: "root"
})
export class ProductServiceService {
  // ตัวแปรเก็บข้อมูลที่อ่านได้จาก Firebase
  productListRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // ฟังก์ชันบันทึกข้อมูลไปยัง Firebase
  createProduct(pm: ProductModel) {
    console.log(pm);
    return this.productListRef.push({
      name: pm.name,
      desc: pm.desc,
      price: pm.price,
      qty: pm.qty
    });
  }

  // Get Single
  getProduct(id: string) {
    this.productRef = this.db.object("/product/" + id);
    return this.productRef;
  }

  // Get List
  getProductList() {
    this.productListRef = this.db.list("/product");
    return this.productListRef;
  }

  // Update
  updateProduct(id, pm: ProductModel) {
    return this.productRef.update({
      name: pm.name,
      desc: pm.desc,
      price: pm.price,
      qty: pm.qty
    });
  }

  // Delete
  deleteProduct(id: string) {
    this.productRef = this.db.object("/product/" + id);
    this.productRef.remove();
  }
}
