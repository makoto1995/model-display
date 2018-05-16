import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IconsModule } from './../../components/icons.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display.component';


const adminRoutes: Routes = [{
  path: 'display',
  component: DisplayComponent
}];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(adminRoutes),
    IconsModule,
    HttpClientModule
  ],
  declarations: [
    DisplayComponent,
  ],
  exports: [
    DisplayComponent,
  ],
})
export class DisplayModule {
}
