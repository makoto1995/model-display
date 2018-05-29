import { Component, OnInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
    selector: 'line-detail',
    template: `
        <div class="modal-header">
          <h4 class="modal-title pull-left">Modal</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p *ngFor="let item of items">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Cumque delectus enim esse excepturi, impedit, iste magnam officia optio,
          quam quis quisquam saepe sint unde velit vitae! Animi in iusto ut?</p>
        </div>
  `
})
export class LineInfoModalComponent implements OnInit {
    title: string;
    closeBtnName: string;
    list: any[] = [];

    static parameters = [BsModalRef];
    constructor(public bsModalRef: BsModalRef) { }
    ngOnInit() {
        this.list.push('PROFIT!!!');
    }
}
