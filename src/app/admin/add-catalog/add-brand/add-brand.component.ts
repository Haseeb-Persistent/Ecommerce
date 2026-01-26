import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../../../core/Services/catalog-service.service';
import { BrandResDto } from '../../../core/Models/catalog';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css'] // fixed typo
})
export class AddBrandComponent implements OnInit {
  brandForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      image: [null] // optional
    });
  }

  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

submitBrand() {
  if (this.brandForm.invalid) return;

  const formData = new FormData();
  formData.append('Name', this.brandForm.value.name);
  if (this.selectedImage) {
    formData.append('Image', this.selectedImage);
  }

  this.catalogService.addBrand(formData).subscribe({
    next: res => alert('Brand added!'),
    error: err => console.error(err)
  });
}

}
