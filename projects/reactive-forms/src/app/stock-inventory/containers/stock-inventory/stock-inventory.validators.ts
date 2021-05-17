import { AbstractControl } from "@angular/forms";

export class StockValidators {
  static checkBranch(control: AbstractControl) {
    const regexp = /^[a-z]\d{3}$/i; // letter, followed by 3 numbers
    const valid = regexp.test(control.value);
    return valid ? null : { invalidBranch: true };
  }

  static checkItemExists(control: AbstractControl) {
    const items = control.get('items');
    const selector = control.get('selector');

    if (!(items && selector)) return null;

    const exists = items.value.some((items) => {
      return items.productId === parseInt(selector.value.productId, 0);
    })

    return exists ? { stockExists: true } : null;
  }
}