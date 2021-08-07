import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { MealsService } from './services/meals/meals.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: [MealsService]
})
export class SharedModule {
}
