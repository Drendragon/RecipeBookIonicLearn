import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {RecipeModel} from "../models/Recipe.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth.service";

@Injectable()
export class RecipeService {

  private _recipes: RecipeModel[] = [];

  constructor(private toastCtrl: ToastController,
              private http: HttpClient,
              private auth: AuthService) {
  }

  addRecipe(item: RecipeModel) {
    this._recipes.push(item);

    const toast = this.toastCtrl.create({
      message: 'Recipe created',
      duration: 3000,
      position: 'top'
    });
    toast.present();

    console.log(this._recipes);

  }

  getRecipes(): RecipeModel[] {
    if (this._recipes == [] || this._recipes == null)
      this._recipes = [];

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

  updateRecipe(index: number, item: RecipeModel) {
    this._recipes[index] = item;

    const toast = this.toastCtrl.create({
      message: 'Updated successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

  storeRecipes(token: string) {
    const userID = this.auth.getActiveUser().uid;
    return this.http.put(
      'https://angular-learn-6e26d.firebaseio.com/' + userID + '/recipes.json?auth=' + token,
      this._recipes
    ).map(
      (response: Response) => {
        return response;
      }
    );
  }

  fetchRecipes(token: string) {
    const userID = this.auth.getActiveUser().uid;
    return this.http.get<RecipeModel[]>(
      'https://angular-learn-6e26d.firebaseio.com/' + userID + '/recipes.json?auth=' + token
    ).map(
      (response) => {
        return response;
      }
    ).do(
      (data) => {
        this._recipes = data;
      }
    );
  }

}
