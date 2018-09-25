import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeService} from "../../services/Recipe.service";
import {RecipeModel} from "../../models/Recipe.model";
import {RecipePage} from "../recipe/recipe";
import {SlOptionsPage} from "../shopping-list/sl-options/sl-options";
import {AuthService} from "../../services/Auth.service";

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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService,
    private popoverCtrl: PopoverController,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private alert: AlertController) {
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
              this.recipeService.fetchRecipes(token).subscribe(
                () => {
                  loader.dismiss();
                  this._recipes = this.recipeService.getRecipes().map(
                    (recipe) => {
                      if(!recipe.ingredients){
                        recipe.ingredients = [];
                      }
                      return recipe;
                    }
                  );
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
              this.recipeService.storeRecipes(token).subscribe(
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
