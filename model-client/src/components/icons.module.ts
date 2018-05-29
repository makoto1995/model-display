import { NgModule } from '@angular/core';
import {
    IconHome,
    IconHeart,
    IconGithub,
    IconCommand,
    IconSettings,
    IconActivity,
    IconLayers,
    IconUser
} from 'angular-feather';

const icons = [
    IconHome,
    IconHeart,
    IconGithub,
    IconCommand,
    IconSettings,
    IconActivity,
    IconLayers,
    IconUser
];

@NgModule({
    imports: icons,
    exports: icons
})
export class IconsModule { }
