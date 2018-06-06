import { LineInfoModalComponent } from './lineInfoModal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IconsModule } from './../../components/icons.module';
import { NgModule } from '@angular/core';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display.component';
import { ModalModule } from 'ngx-bootstrap';


const adminRoutes: Routes = [{
  path: 'display',
  component: DisplayComponent
}];

const stompConfig: StompConfig = {
  url: 'ws://localhost:9000/arm-position-websocket/websocket',
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(adminRoutes),
    IconsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  declarations: [
    DisplayComponent,
    LineInfoModalComponent
  ],
  exports: [
    DisplayComponent
  ],
  entryComponents: [
    LineInfoModalComponent
  ]
})
export class DisplayModule {
}
