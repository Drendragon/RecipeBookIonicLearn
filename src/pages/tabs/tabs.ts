import { Component } from '@angular/core';
import {ShoppingListPage} from "../shopping-list/shopping-list";
import {RecipesPage} from "../recipes/recipes";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  shoppingList = ShoppingListPage;
  recipes = RecipesPage;

  constructor() {

  }
}
