import {ApplicationRef, NgModule, Provider,} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {createInputTransfer, createNewHosts, removeNgStyles,} from '@angularclass/hmr';

import {RouterModule, Routes} from '@angular/router';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';
import {DirectivesModule} from '../components/directives.module';
import {AccountModule} from './account/account.module';
import {AdminModule} from './admin/admin.module';
import {DisplayModule} from './display/display.module';

export function getAuthHttp(httpClient) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), httpClient);
}

let providers: Provider[] = [{
  provide: AuthHttp,
  useFactory: getAuthHttp,
  deps: [HttpClient]
}];

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}];

@NgModule({
  providers,
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: process.env.toString() === 'development'}),
    MainModule,
    DirectivesModule,
    AccountModule,
    AdminModule,
    DisplayModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static parameters = [ApplicationRef];

  constructor(private appRef: ApplicationRef) {
    this.appRef = appRef;
  }

  hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', store);
    console.log('store.state.data:', store.state.data);
    // inject AppStore here and update it
    // this.AppStore.update(store.state)
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    Reflect.deleteProperty(store, 'state');
    Reflect.deleteProperty(store, 'restoreInputValues');
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    store.state = {data: 'yolo'};
    // store.state = Object.assign({}, appState)
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    Reflect.deleteProperty(store, 'disposeOldHosts');
    // anything you need done the component is removed
  }
}
