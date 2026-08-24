import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {

  showLayout = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // layout hide/show
        this.showLayout = !(
          event.url.includes('/Admin') ||
          event.url.includes('/Authentication')
        );

        // 🔥 AOS FIX
        setTimeout(() => {
          AOS.refreshHard();
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true
    });
  }
}
