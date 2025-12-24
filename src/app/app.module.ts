// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// App Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';

// Modules
import { LayoutModule } from './layout/layout.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Interceptors & Injection Tokens
import { store } from '../redux/Catalog/store';
import { CatalogEffects } from '../redux/Catalog/catalog-effect';
import { BASE_API, BASE_IMAGE_API } from './core/Token/baseUrlToken';
import { environment } from './core/enviroment/enviroment';
import { ApiInterceptor } from './core/interceptor/ApiInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ProductsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(store),
    EffectsModule.forRoot([CatalogEffects])
  ],
  providers: [
    { provide: BASE_API, useValue: environment.baseApi },
    { provide: BASE_IMAGE_API, useValue: environment.imageBaseApi },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
