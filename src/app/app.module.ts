import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {RecipePage} from "../pages/recipe/recipe";
import {RecipesPage} from "../pages/recipes/recipes";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {ShoppingListService} from "../services/ShoppingList.service";
import {RecipeService} from "../services/Recipe.service";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/Auth.service";
import {SlOptionsPage} from "../pages/shopping-list/sl-options/sl-options";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    SlOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    SlOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipeService,
    AuthService,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
