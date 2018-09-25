import {IngredientModel} from "../models/Ingredient.model";
import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth.service";
import "rxjs/Rx";

@Injectable()
export class ShoppingListService {

  private _ingredient: IngredientModel[] = [];

  constructor(
    private toastCtrl: ToastController,
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  addIngredient(item: IngredientModel) {
    this._ingredient.push(item);

    const toast = this.toastCtrl.create({
      message: 'Ingredient saved successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

  addIngredients(items: IngredientModel[]) {

    console.log(items);

    this._ingredient.push(...items);

    const toast = this.toastCtrl.create({
      message: 'All ingredients saved successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getIngradiens(): IngredientModel[] {
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

  storeList(token: string) {
    const userID = this.auth.getActiveUser().uid;
    return this.http.put(
      'https://angular-learn-6e26d.firebaseio.com/' + userID + '/shoppingList.json?auth=' + token,
      this._ingredient
    ).map(
      (response: Response) => {
        return response;
      }
    );
  }

  fetchList(token: string) {
    const userID = this.auth.getActiveUser().uid;
    return this.http.get<IngredientModel[]>(
      'https://angular-learn-6e26d.firebaseio.com/' + userID + '/shoppingList.json?auth=' + token
    ).map(
      (response) => {
        return response;
      }
    ).do(
      (data) => {
        this._ingredient = data;
      }
    );
  }

}
