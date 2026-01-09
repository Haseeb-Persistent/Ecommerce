// app.module.ts
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { appEffects, store } from '../redux/store';
import { CatalogEffects } from '../redux/Catalog/catalog-effect';
import { BASE_API, BASE_IMAGE_API } from './core/Token/baseUrlToken';
import { environment } from './core/enviroment/enviroment';
import { ApiInterceptor } from './core/interceptor/ApiInterceptor';
import { AddCatalogModule } from './admin/add-catalog/add-catalog.module';
import { LoaderInterceptor } from './core/Services/loader.interceptor';
import { WishListComponent } from './wish-list/wish-list.component';
import { PopupComponent } from './shared/components/popup/popup.component';
import { appInitializer } from './helper/app-initializer';
import { AuthService } from './core/Services/authentication.service';
import { AuthInterceptor } from './core/interceptor/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePageComponent,  
    WishListComponent,
    PopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ProductsModule,
    SharedModule,
    AddCatalogModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(store),
    EffectsModule.forRoot([...appEffects]),
  ],
providers: [
  { provide: BASE_API, useValue: environment.baseApi },
  { provide: BASE_IMAGE_API, useValue: environment.imageBaseApi },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: APP_INITIALIZER, useFactory: appInitializer, deps: [AuthService], multi: true },
],

  bootstrap: [AppComponent]
})
export class AppModule { }
