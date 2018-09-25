import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import {TabsPage} from '../pages/tabs/tabs';
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from '../services/Auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  signIn = SigninPage;
  signUp = SignupPage;
  tabsPage = TabsPage;
  rootPage: any = this.signIn;
  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private auth: AuthService

  ) {

    firebase.initializeApp({
      apiKey: "AIzaSyBpfbI6PAwlfRg1tmfNbvkDq29OuapnIRA",
      authDomain: "angular-learn-6e26d.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = this.tabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = this.signIn;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut() {
    this.auth.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signIn);
  }
}
