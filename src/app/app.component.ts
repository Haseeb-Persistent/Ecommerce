import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  showLayout = true;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object  // ADD THIS
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !(
          event.url.includes('/Admin') ||
          event.url.includes('/Authentication')
        );

        if (isPlatformBrowser(this.platformId)) {  // ✅ ADD THIS CHECK
          setTimeout(() => {
            AOS.refreshHard();
          }, 100);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {  // ✅ ADD THIS CHECK
      AOS.init({
        duration: 900,
        easing: 'ease-in-out',
        once: true
      });
    }
  }
}