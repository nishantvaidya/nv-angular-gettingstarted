import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }  from '@angular/router';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    AppRoutingModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
