import {IngredientModel} from "./Ingredient.model";

export class RecipeModel {
  constructor(
    public title: string,
    public description: string,
    public difficulty: string,
    public ingredients: IngredientModel[]
  ){}
}
