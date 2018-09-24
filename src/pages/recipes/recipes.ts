import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeService} from "../../services/Recipe.service";
import {RecipeModel} from "../../models/Recipe.model";
import {RecipePage} from "../recipe/recipe";

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  _recipes: RecipeModel[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService) {
  }

  ionViewWillEnter() {
    this._recipes = this.recipeService.getRecipes();
  }


  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'new'
    });
  }

  onLoadRecipe(_recipe: RecipeModel, _index: number) {
    this.navCtrl.push(RecipePage, {recipe: _recipe, index: _index})
  }

}
