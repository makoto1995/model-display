import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';
import 'unityLoader';
import * as $ from 'jquery';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../components/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LineInfoModalComponent } from './lineInfoModal.component';

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

interface PositionMessage {
  position: number[];
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

export class DisplayComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public messages: Observable<Message>;
  public subscribed = false;
  static parameters = [BsModalService, AuthService, StompService, NgZone, HttpClient];
  public gameInstance: any;
  currentProductLine = '1';
  isLoaded = false;
  isManager;
  currentUser = {};
  AuthService;
  modalRef: BsModalRef;
  items: any[];

  public constructor(private modalService: BsModalService
    , private authService: AuthService
    , private _stompService: StompService
    , private ngZone: NgZone
    , public client: HttpClient) {
    this.AuthService = authService;
    (window as any).communication = (window as any).communication || {};
    (window as any).communication.getModelInfo = this.getModelInfo.bind(this);
    (window as any).communication.startup = this.startup.bind(this);
    (window as any).communication.openLineDetail = this.openLineDetail.bind(this);
    this.AuthService.isManager().then(is => {
      this.isManager = is;
    });
    this.items = Array(15).fill(0);
  }

  openLineDetail() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.modalRef = this.modalService.show(LineInfoModalComponent, {initialState});
  }

  public getModelInfo(name: string) {
    let body = JSON.stringify({
      modelName: name
    });
    this.client.post<Result<ModelDetail>>('http://localhost:9000/model/', body, {
      observe: 'response',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).subscribe(
      res => {
        if (res.body.success === false) {
          console.log('无该模型!');
          console.log(res.body.error);
          return;
        }
        console.log(res.body.data);
        this.setModelInfo(res.body.data);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

  public ngOnInit(): void {
    this.init();
    this.subscribe();
  }

  startup() {
    this.client.post('http://localhost:9000/arms/startup', JSON.stringify({
      productLineNum: 1,
      productLineArms: 10
    }), {
        observe: 'response',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }).subscribe(res => {
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private init() {
    $.getScript('assets/Build/UnityLoader.js').done(() =>
      this.gameInstance = UnityLoader.instantiate('gameContainer', 'assets/Build/DisplayBuild.json'));

  }

  public subscribe() {
    console.log(this.subscribed);
    this.messages = this._stompService.subscribe('/topic/positions');
    this.subscription = this.messages.subscribe(this.on_next);
    this.subscribed = true;
  }

  public unsubscribe() {
    if (!!!this.subscribed) {
      return;
    }
    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;
    this.subscribed = false;
  }

  public on_next = (message: Message) => {
    console.log(message);
    var positionMessages: PositionMessage[] = JSON.parse(message.body);
    console.log(positionMessages[0].position[0]);
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm0-1',
      angles: positionMessages[0].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm1-1',
      angles: positionMessages[1].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm2-1',
      angles: positionMessages[2].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm1-2',
      angles: positionMessages[3].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm2-2',
      angles: positionMessages[4].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm1-3',
      angles: positionMessages[5].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm2-3',
      angles: positionMessages[6].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm1-4',
      angles: positionMessages[7].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm2-4',
      angles: positionMessages[8].position
    }));
    this.gameInstance.SendMessage('Plane', 'MoveArms', JSON.stringify({
      armName: 'Arm0-2',
      angles: positionMessages[9].position
    }));
  }

  changeProductLine(productLineNum: string) {
    this.currentProductLine = productLineNum;
    this.gameInstance.SendMessage('Plane', 'ChangeProductLine', productLineNum.toString());
  }

  setModelInfo(modelDetail: ModelDetail) {
    this.gameInstance.SendMessage('Plane', 'SetModelInfo', JSON.stringify(modelDetail));
  }

  changeCarState() {
    this.gameInstance.SendMessage('Plane', 'ChangeCarState');
  }

  sendAlert() {
    this.client.post('http://localhost:9000/arms/alert', JSON.stringify({
      messageType: 0,
      alertArm: 'Arm0-1',
      alertPart: 'Part2'
    }), {
        observe: 'response',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }).subscribe(res => {
        console.log(res);
      });
    this.gameInstance.SendMessage('Plane', 'AlertPart', JSON.stringify({
      armName: 'Arm0-1',
      partName: 'Part2',
    }));
  }
  reverseAlert() {
    this.client.post('http://localhost:9000/arms/alert', JSON.stringify({
      messageType: 1,
      alertArm: 'Arm0-1',
      alertPart: 'Part2'
    }), {
        observe: 'response',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }).subscribe(res => {
        console.log(res);
      });
    this.gameInstance.SendMessage('Plane', 'ReversePartAlert', JSON.stringify({
      armName: 'Arm0-1',
      partName: 'Part2',
    }));
  }
}
