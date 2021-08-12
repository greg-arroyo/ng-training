import { Component, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";
import { Meal } from "../../../shared/services/meals/meals.service";
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="i.e.: Hamburger"
              formControlName="name">
          </label>
          <div class="error" *ngIf="required">
            Meal name is required
          </div>
        </div>
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()">
              <img src="../../../../assets/add-white.svg" alt="Add food">
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let ingredient of ingredients.controls; index as i;">
              <input
                [formControlName]="i"
                placeholder="i.e.: beef patty">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>
        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="createMeal()">
              Create meal
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  `
})
export class MealFormComponent {
  @Output()
  create = new EventEmitter<Meal>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: this.formBuilder.array([''])
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}