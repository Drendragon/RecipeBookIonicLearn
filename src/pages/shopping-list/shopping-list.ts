import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/ShoppingList.service";
import {IngredientModel} from "../../models/Ingredient.model";

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
    private shoppingListService: ShoppingListService
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

  ionViewWillEnter(){
    this.reloadList();
  }

  onPress(i: number) {
    this.shoppingListService.removeItem(i);
    this.reloadList();
  }

  reloadList() {
    this.listItems = this.shoppingListService.getIngradiens();
  }
}
