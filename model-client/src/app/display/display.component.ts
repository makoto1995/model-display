import {Component, NgZone, OnInit} from '@angular/core';
import 'unityLoader';
declare const UnityLoader;
import * as $ from 'jquery';


@Component({
  selector: 'display',
  template: require('./display.html'),
  styles: [require('./display.scss')],
})
export class DisplayComponent {
  public gameInstance: any;
  constructor() {
  }
  public ngOnInit(): void {
    this.init();
  }
  private init() {
    $.getScript('assets/Build/UnityLoader.js').done(function ( bla , text) {
      this.gameInstance =
        UnityLoader.instantiate('gameContainer', 'assets/Build/TestBuild.json');
      //gameObject not undefined at this stage..
    });
  }
}
