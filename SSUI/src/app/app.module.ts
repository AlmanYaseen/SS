import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { AngularWebStorageModule } from 'angular-web-storage';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { PoststoriesComponent } from './user/poststories/poststories.component';
import { ReadstoriesComponent } from './user/readstories/readstories.component';
import { ApprovestoriesComponent } from './admin/approvestories/approvestories.component';
import { RegisterComponent } from './register/register.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';



@NgModule({
  imports: [
    BrowserModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule,
    FormsModule,
    LoadingBarHttpClientModule,
    ChartsModule,
    AngularWebStorageModule


   
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    PoststoriesComponent,
    ReadstoriesComponent,
    ApprovestoriesComponent,
    AccessdeniedComponent,
   
   
   
  ],
  providers:[],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
