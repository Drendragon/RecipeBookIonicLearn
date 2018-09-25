import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/Auth.service";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, private loadingCtrl: LoadingController,
              private alert: AlertController) {
  }

  onSignin(form: NgForm) {
    const loader = this.loadingCtrl.create(
      {
        content: "Signining in..."
      }
    );

    loader.present();

    this.auth.signin(form.value.email, form.value.password)
      .then(
        (data) => {
          loader.dismiss();
        }
      ).catch(
      (error) => {
        loader.dismiss();
        const alert = this.alert.create({
          title: 'signin failed',
          message: error.message,
          buttons: [
            'OK'
          ]
        });
        alert.present();
      }
    );
  }
}
