import { NgModule } from '@angular/core';
import { IconsModule } from './../../components/icons.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../components/auth/auth-guard.service';
import { AdminComponent } from './admin.component';
import { BsDropdownModule } from 'ngx-bootstrap';


const adminRoutes: Routes = [{
  path: 'admin',
  component: AdminComponent,
}];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(adminRoutes),
    IconsModule,
    BsDropdownModule
  ],
  declarations: [
    AdminComponent,
  ],
  exports: [
    AdminComponent,
  ],
})
export class AdminModule {
}
