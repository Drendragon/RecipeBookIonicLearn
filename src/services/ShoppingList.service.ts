import {IngredientModel} from "../models/Ingredient.model";
import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class ShoppingListService {

  private _ingredient: IngredientModel[] = [];

  constructor(private toastCtrl: ToastController){}

  addIngredient(item: IngredientModel){
    this._ingredient.push(item);

    const toast = this.toastCtrl.create({
      message: 'Ingredient saved successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

  addIngredients(items: IngredientModel[]){

    console.log(items);

    this._ingredient.push(...items);

    const toast = this.toastCtrl.create({
      message: 'All ingredients saved successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getIngradiens(): IngredientModel[]{
    return this._ingredient.slice();
  }

  removeItem(i: number) {
    this._ingredient.splice(i, 1);

    const toast = this.toastCtrl.create({
      message: 'Removed successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
