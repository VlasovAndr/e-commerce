import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './modules/product';
import { IPagination } from './modules/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-commerce';
  products: IProduct[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5153/api/products?pageSize=50').subscribe((response: IPagination) => {
      this.products = response.data;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
