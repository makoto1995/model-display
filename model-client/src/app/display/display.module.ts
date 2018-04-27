import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../components/auth/auth-guard.service';
import { DisplayComponent } from './display.component';


const adminRoutes: Routes = [{
    path: 'display',
    component: DisplayComponent
}];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forChild(adminRoutes),

    ],
    declarations: [
        DisplayComponent,
    ],
    exports: [
        DisplayComponent,
    ],
})
export class DisplayModule {}
