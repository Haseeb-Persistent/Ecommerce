import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandResDto, CatagoryResDto } from '../../../core/Models/catalog';
import { CatalogService } from '../../../core/Services/catalog-service.service';
import { LoaderService } from '../../../core/Services/loader.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
loading: boolean = false;
  productForm!: FormGroup;
  categories: CatagoryResDto[] = [];
  brands: BrandResDto[] = [];
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private catalogService: CatalogService,private loader: LoaderService) {}

  ngOnInit(): void {
    // Reactive form setup
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      originalPrice: [0, Validators.required],
      discountPercentage: [0],
      stockQuantity: [0, Validators.required],
      category: [null, Validators.required],
      brand: [null, Validators.required],
      image: [null]
    });
this.catalogService.getCategories().subscribe(res => {
  this.categories = res.data ?? []; // if res.data is null, assign empty array
});

this.catalogService.getBrands().subscribe(res => {
  this.brands = res.data ?? [];
});

   
  }

  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submitProduct() {
    if (this.productForm.invalid) return;
    const formData = new FormData();
    const formValue = this.productForm.value;
    
    formData.append('Id', formValue.id.toString());
    formData.append('Name', formValue.name);
    formData.append('Description', formValue.description);
    formData.append('OrignalPrice', formValue.originalPrice.toString());
    formData.append('DiscountPercentage', formValue.discountPercentage.toString());
    formData.append('StockQuantity', formValue.stockQuantity.toString());
       
    if (formValue.category) {
      formData.append('CategoryId', formValue.category.id.toString());
    }

    if (formValue.brand) {
      formData.append('BrandId', formValue.brand.id.toString());
    }

    if (this.selectedImage) {
      formData.append('Thumbnail', this.selectedImage); 
    }

    this.catalogService.AddProduct(formData).subscribe({
      next: (res) => {
         this.loader.show();
        this.productForm.reset();
        this.selectedImage = null;
        this.loader.hide();
      },  
      error: (err) => {
        console.error('Error adding product', err);
      }
    });
  }
}
