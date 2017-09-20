import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import {BusyModule} from 'angular2-busy';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from'./components/cart/cart.component';

import { AuthService } from'./services/auth.service';
import { ValidateService } from './services/validate.service';
import { ProductService } from './services/product.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from '../app/guards/auth.gaurd';
import { BasketService } from './services/basket.service';

const appRoutes : Routes = [
  { path:"", component:HomeComponent},
  { path:"register", component:RegisterComponent},
  { path:"login", component:LoginComponent},
  { path:"dashboard", component:DashboardComponent, canActivate: [AuthGuard]},
  { path:"profile", component:ProfileComponent,canActivate: [AuthGuard]},
  { path:"cart", component:CartComponent,canActivate: [AuthGuard]}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    BusyModule
  ],
  providers: [ValidateService,AuthService,AuthGuard,ProductService,BasketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
