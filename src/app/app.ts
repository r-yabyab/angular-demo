import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Topnav } from "./topnav/topnav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Topnav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-demo');
}
