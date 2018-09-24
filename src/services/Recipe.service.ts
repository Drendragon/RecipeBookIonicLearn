import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {RecipeModel} from "../models/Recipe.model";

@Injectable()
export class RecipeService {

  private _recipes: RecipeModel[] = [];

  constructor(private toastCtrl: ToastController){}

  addRecipe(item: RecipeModel){
    this._recipes.push(item);

    const toast = this.toastCtrl.create({
      message: 'Recipe created',
      duration: 3000,
      position: 'top'
    });
    toast.present();

    console.log(this._recipes);

  }

  getRecipes(): RecipeModel[]{
    return this._recipes.slice();
  }

  removeItem(i: number) {
    this._recipes.splice(i, 1);

    const toast = this.toastCtrl.create({
      message: 'Removed successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  updateRecipe(index: number, item: RecipeModel){
    this._recipes[index] = item;

    const toast = this.toastCtrl.create({
      message: 'Updated successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

}
