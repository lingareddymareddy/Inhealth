import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout.component';
import { HeaderComponent} from './layouts/header.component';
import { FooterComponent} from './layouts/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { httpInterceptorProviders } from './core/interceptors';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    LocalStorageModule.forRoot({
      prefix: 'myblog',
      storageType: 'localStorage'
}),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
