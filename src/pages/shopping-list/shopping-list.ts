import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/ShoppingList.service";
import {IngredientModel} from "../../models/Ingredient.model";
import {SlOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/Auth.service";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: IngredientModel[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private alert: AlertController
  ) {
    this.reloadList();
  }

  onAddItem(form: NgForm) {

    const name = form.value.ingredientName;
    const amount = form.value.ingredientAmount;

    this.shoppingListService.addIngredient(new IngredientModel(name, amount));

    form.reset();

    this.reloadList();
  }

  ionViewWillEnter() {
    this.reloadList();
  }

  onPress(i: number) {
    this.shoppingListService.removeItem(i);
    this.reloadList();
  }

  reloadList() {
    this.listItems = this.shoppingListService.getIngradiens();
  }

  onShowActions(ev: MouseEvent) {

    const loader = this.loadingCtrl.create(
      {
        content: "Working..."
      }
    );

    const options = this.popoverCtrl.create(SlOptionsPage);
    options.present({ev: ev});

    options.onDidDismiss(
      (data) => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loader.present();
          this.auth.getActiveUser().getIdToken().then(
            (token: string) => {
              this.shoppingListService.fetchList(token).subscribe(
                () => {
                  loader.dismiss();
                  this.reloadList();
                },
                error => {
                  loader.dismiss();
                  this.handleError(error.message);
                }
              );
            }
          );

        } else if (data.action == 'store') {
          loader.present();
          this.auth.getActiveUser().getIdToken().then(
            (token: string) => {
              this.shoppingListService.storeList(token).subscribe(
                () => loader.dismiss(),
                error => {
                  loader.dismiss();
                  this.handleError(error.message);
                }
              );
            }
          );

        }
      }
    )

  }

  handleError(errorMsg: string) {
    const alert = this.alert.create({
      title: 'Error occured',
      message: errorMsg,
      buttons: [
        'OK'
      ]
    });
    alert.present();
  }
}
