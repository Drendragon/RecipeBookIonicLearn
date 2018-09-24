import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RecipeModel} from "../../models/Recipe.model";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/ShoppingList.service";
import {RecipeService} from "../../services/Recipe.service";

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: RecipeModel;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private shoppingListService: ShoppingListService,
              private recipesService: RecipeService) {
  }


  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEdit() {
    this.navCtrl.push(EditRecipePage, {mode: 'edit', recipe: this.recipe, index: this.index})
  }

  onDelete() {
    this.recipesService.removeItem(this.index);
    this.navCtrl.popToRoot();
  }
}
