import { Component } from '@angular/core';
import { LoaderService } from '../core/Services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
constructor(public loader: LoaderService) { }
loadering$ = this.loader.loading$;
}
