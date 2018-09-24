import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/Recipe.service";
import {RecipeModel} from "../../models/Recipe.model";
import {IngredientModel} from "../../models/Ingredient.model";

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode: string;
  SelectOptions = ['Easy', 'Normal', 'Hard'];
  recipeForm: FormGroup;

  recipe: RecipeModel;
  index: number;

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastController: ToastController,
              private recipesService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');

    if (this.mode == 'edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initializeForm();
  }

  private initializeForm() {

    let title = null;
    let description = null;
    let difficulty = 'Normal';
    let ingredients = [];

    if (this.mode == 'edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;

      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(
          new FormControl(ingredient.name, Validators.required)
        );
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients: IngredientModel[] = [];

    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(
        name => {
          return {name: name, amount: 1}
        }
      );
    }

    if (this.mode == 'edit') {
      this.recipesService.updateRecipe(this.index, new RecipeModel(value.title, value.description, value.difficulty, ingredients));
    }else{
      this.recipesService.addRecipe(
        new RecipeModel(value.title, value.description, value.difficulty, ingredients)
      );
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add new',
          handler: () => {
            this.createNewIngredientAllert().present();
          }
        },
        {
          text: 'Delete all',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;

            if (len > 0) {
              for (let i = len; i > 0; i--) {
                fArray.removeAt(i - 1);
              }

              const toast = this.toastController.create({
                message: 'Succesfully deleted everything',
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAllert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastController.create({
                message: 'Not allowed empty name',
                duration: 3000,
                position: 'top'
              });
              toast.present();

              return;
            } else {
              (<FormArray>this.recipeForm.get('ingredients')).push(
                new FormControl(data.name, Validators.required)
              );

              const toast = this.toastController.create({
                message: 'Added',
                duration: 3000,
                position: 'top'
              });
              toast.present();

            }
          }
        }
      ]
    });
  }
}
