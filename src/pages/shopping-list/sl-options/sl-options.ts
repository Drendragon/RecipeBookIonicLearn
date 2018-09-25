import { Component } from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sl-options',
  templateUrl: 'sl-options.html',
})
export class SlOptionsPage {

  constructor(private viewCtrl: ViewController) {

  }

  onAction(action: string) {
    this.viewCtrl.dismiss({action: action});
  }

}
