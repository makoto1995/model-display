import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import 'unityLoader';
import * as $ from 'jquery';

declare const UnityLoader;

interface ModelDetail {
  modelName: string;
  modelType: string;
  modelWeight: string;
  modelHeight: string;
  modelWidth: string;
  modelDepth: string;
  modelCost: string;
}

interface Result<T> {
  success: boolean;
  data: T;
  error?: string;
  token?: string;
}

@Component({
  selector: 'display',
  template: require('./display.html'),
  styles: [require('./display.scss')],
})
export class DisplayComponent {
  static parameters = [NgZone, HttpClient];
  public gameInstance: any;
  currentProductLine = '1';
  isConfigured = false;

  public constructor(private ngZone: NgZone, public client: HttpClient) {
    $('#wrapper').toggleClass('toggled');
  }


  public getModelInfo(name: string) {
    if (!this.isConfigured) {
      this.isConfigured = true;
      (window as any).communication = (window as any).communication || {};
      (window as any).communication.publicFunc = this.PubFunc.bind(this);
    }
    let body = JSON.stringify({
      modelName: name
    });
    this.client.post<Result<ModelDetail>>('/api/model/', body, {
      observe: 'response',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).subscribe(
      res => {
        if (res.body.success = false) {
          alert('无该模型!');
          alert(res.body.error);
          return;
        }
        this.setModelInfo(res.body.data);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

  public PubFunc(input: string) {
    this.ngZone.run(() => alert(input));
  }

  public ngOnInit(): void {
    this.init();
  }

  private init() {
    $.getScript('assets/Build/UnityLoader.js').done(() =>
      this.gameInstance = UnityLoader.instantiate('gameContainer', 'assets/Build/DisplayBuild.json'));
  }

  changeProductLine() {
    this.gameInstance.SendMessage();
  }

  setModelInfo(modelDetail: ModelDetail) {
    this.gameInstance.SendMessage('Plane', 'SetModelInfo', JSON.stringify(modelDetail));
  }

  changeCarState() {
    this.gameInstance.SendMessage('Plane', 'ChangeCarState');
  }

  sendAlert() {
    this.gameInstance.SendMessage('Plane', 'AlertPart', JSON.stringify({
      armName: 'Arm0-1',
      partName: 'Part2',
    }));
  }
}
