import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'search-bar',
  imports: [FormsModule, CommonModule, ProductCard],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {

  searchTerm = ''
  products: any[] = []
  currentPage = 0
  limit = 4
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.getData()
  }

  getData(searchTerm?: string) {
    this.http.get("https://dummyjson.com/test")
      .subscribe(data => {
        console.log(data)
      })
  }

  onSearch() {
    this.getData(this.searchTerm);
    this.searchTerm = '';
  }

  getProducts() {
    const skip = this.currentPage * this.limit
    this.http.get(`https://dummyjson.com/products?limit=${this.limit}&skip=${skip}`)
      .subscribe((data: any) => {
        console.log(data.products)
        this.products = data.products
        this.cdr.detectChanges()
      })
  }

  nextPage() {
    this.currentPage++
    this.getProducts()
  }

}