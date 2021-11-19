import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm : FormGroup;

  constructor(private route: ActivatedRoute,private recipeservice:RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.inintForm();
      });
  }

  onSubmit(){

    console.log(this.recipeForm);
  }

  private inintForm(){
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editmode){
     const recipe = this.recipeservice.getRecipe(this.id);
     recipeName = recipe.name;
     recipeDescription = recipe.description;
     recipeImagePath = recipe.imagePath;

    }

    this.recipeForm = new FormGroup({
     'name' : new FormControl(recipeName),
     'description' : new FormControl(recipeDescription),
     'imagePath' : new FormControl(recipeImagePath),

    })
  }

}
