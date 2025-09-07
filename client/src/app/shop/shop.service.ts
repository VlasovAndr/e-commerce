import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/modules/pagination';
import { IBrand } from '../shared/modules/brand';
import { IType } from '../shared/modules/productType';
import { map } from 'rxjs/operators';
import { ShoppParams } from '../shared/modules/shopParams';
import { IProduct } from '../shared/modules/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:5153/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShoppParams) {

    let params = new HttpParams();

    if (shopParams.brandId != 0) {
      params = params.append('brandId', shopParams.brandId.toString())
    }

    if (shopParams.typeId != 0) {
      params = params.append('typeId', shopParams.typeId.toString())
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search.toString());
    }

    params = params.append('sort', shopParams.sort)
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id)
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
