import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }  from '@angular/router';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './app.routing.module';
import { httpInterceptorProviders } from './interceptors/config.interceptors';
import { LoaderComponent } from './shared/loader.component';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    UserModule,
    MessageModule
    
  ],
  bootstrap: [AppComponent],
  providers:[ httpInterceptorProviders]
})
export class AppModule { }
