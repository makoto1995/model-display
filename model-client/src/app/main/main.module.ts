import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { MainComponent } from './main.component';

export const ROUTES: Routes = [
  { path: 'home', component: MainComponent },
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    RouterModule.forChild(ROUTES),
    BsDropdownModule
  ],
  declarations: [
    MainComponent,
  ],
  providers: [
    // SocketService,

  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule {

}
