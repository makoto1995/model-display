import { IconsModule } from './icons.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';

import {AuthModule} from './auth/auth.module';

import {NavbarComponent} from './navbar/navbar.component';


@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        RouterModule,
        IconsModule
    ],
    declarations: [
        NavbarComponent,
    ],
    exports: [
        NavbarComponent,
    ]
})
export class DirectivesModule {}
