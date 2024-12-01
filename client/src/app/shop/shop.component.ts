import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/modules/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/modules/brand';
import { IType } from '../shared/modules/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getPtuducts();
    this.getBrands();
    this.getTypes();
  }

  getPtuducts() {
    this.shopService.getProducts().subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = response;
    }, error => {
      console.log(error);
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

}
