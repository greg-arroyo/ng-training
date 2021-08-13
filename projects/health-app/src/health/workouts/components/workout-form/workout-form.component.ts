import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Workout } from "../../../shared/services/workouts/workouts.service";
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input
              type="text"
              placeholder="i.e.: Hamburger"
              formControlName="name">
          </label>
          <div class="error" *ngIf="required">
            Workout name is required
          </div>
        </div>
        <div class="workout-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createWorkout()">
              Create workout
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateWorkout()">
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>
          <div 
            class="workout-form__delete"
            *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete workout?</p>
              <button
                class="confirm"
                type="button"
                (click)="removeWorkout()">
                Yes
              </button>
              <button
                class="cancel"
                type="button"
                (click)="toggle()">
                No
              </button>
            </div>
            <button
              class="button button--delete"
              type="button"
              (click)="toggle()">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class WorkoutFormComponent implements OnChanges {
  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  toggled = false;
  exists = false;

  form = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.workout && this.workout.name) {
    //   this.exists = true;
    //   this.emptyIngredients();
    //
    //   const value = this.workout;
    //   this.form.patchValue(value);
    //   if (value.ingredients) {
    //     for (const item of value.ingredients) {
    //       this.ingredients.push(new FormControl(item));
    //     }
    //   }
    // }
  }

  // emptyIngredients() {
  //   while(this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  // get ingredients() {
  //   return this.form.get('ingredients') as FormArray;
  // }
  //
  // addIngredient() {
  //   this.ingredients.push(new FormControl(''));
  // }
  //
  // removeIngredient(index: number) {
  //   this.ingredients.removeAt(index);
  // }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
