import { NavbarComponent } from './../../components/navbar/navbar.component';
import { DirectivesModule } from './../../components/directives.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from '../../components/auth/auth.service';

const accountRoutes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
  path: 'settings',
  component: SettingsComponent,
}, {
  path: 'signup',
  component: SignupComponent,
}];

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild(accountRoutes),
    DirectivesModule
  ],
  providers: [
    AuthService,
    NavbarComponent
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    SettingsComponent,
  ]
})
export class AccountModule {
}
