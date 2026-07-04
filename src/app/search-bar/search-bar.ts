import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {

  searchTerm = ''
  private http = inject(HttpClient)

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

}