import { Component, Input, OnInit } from '@angular/core';
import { ProductResDto } from '../../core/Models/catalog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { MessageService } from '../../core/Services/messgae.service';
import { addToWishlist } from '../../../redux/Wishlist/wishlist-action';
import { environment } from '../../core/enviroment/enviroment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  constructor(private acticeRoute:ActivatedRoute){}
  ngOnInit(): void {
    let productId = this.acticeRoute.snapshot.paramMap.get('id')
}

 @Input() product!: ProductResDto; 
 

}