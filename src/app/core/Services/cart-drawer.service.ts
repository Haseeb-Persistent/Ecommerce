import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDrawerService {

  private drawerState = new BehaviorSubject<boolean>(false);
  drawer$ = this.drawerState.asObservable();

  OpenCart() {
    document.querySelector('.overlay')?.classList.add('active');
    this.drawerState.next(true);
  }

  CloseCart() {
    this.drawerState.next(false);
    document.querySelector('.overlay')?.classList.remove('active');
  }

  toggle() {
    this.drawerState.next(!this.drawerState.value);
  }
}
