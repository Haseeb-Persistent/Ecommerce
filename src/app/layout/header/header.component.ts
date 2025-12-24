import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../core/Services/catalog-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

constructor( private CatalogService:CatalogService) { }

Categories:any[]=[];


  ngOnInit(): void {  
    this.CatalogService.getCategories().subscribe((result: any) => {
      this.Categories = result.data;
    });
  }

}
