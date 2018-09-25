import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/Auth.service";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, private loadingCtrl: LoadingController,
              private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {

    const loader = this.loadingCtrl.create(
      {
        content: "Signing up"
      }
    );

    loader.present();

    this.auth.signup(form.value.email, form.value.password)
      .then(
        (data) => {
          loader.dismiss();
        }
      ).catch(
      (error) => {
        loader.dismiss();
        const alert = this.alert.create({
          title: 'signup failed',
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
