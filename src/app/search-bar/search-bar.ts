import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {

  private http = inject(HttpClient)

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.http.get("https://dummyjson.com/test")
      .subscribe(data => {
        console.log(data)
      })
  }
}