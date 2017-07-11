import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

export class ValidationService {
    static getValidatorErrorMessage(code: string) {
        let config = {
            atLeastOneFieldRequired: 'Required',
            invalidCreditCard: 'Is invalid credit card number',
            invalidEmailAddress: 'Invalid email address',
            invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.'
        };

        return config[code];
    }

    static atLeastOneFieldRequiredValidator(form: FormGroup) {
        // Get parent form
        const parent: FormGroup|FormArray = form.parent;
        const controls = parent && parent.controls || {};

        // Check if value exists in
				for(let key in controls) {
				  const currentValue = parent.get(key).value;

					if(currentValue) {
					  // Field with a value found we can stop checking other field
						return null;
					}
				}

				// If no field as value
        // Mark all field as touched to display validation
        for(let key in controls) {
				  parent.get(key).markAsTouched();
        }

        return { atLeastOneFieldRequired: true };
    }

    static conditionalRequiredValidator(form: FormGroup, formControlName: string|string[]) {

      let changesSubscribed = false;

      return (control: AbstractControl) => {

        const linkedField = form.get(formControlName);

        if(!changesSubscribed) {
          linkedField.valueChanges
            .subscribe(() => {
              control.markAsTouched();
              control.updateValueAndValidity();
            });

          changesSubscribed = true;
        }

        if(!_.isEmpty(linkedField.value) && _.isEmpty(control.value)) {
          return false;
        }

        return true;
      };
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }

    static confirmPassword(form: FormGroup, field) {
      let fieldChanges = false;
      return function innerFunction(control) {
        if (!fieldChanges) {
          form.get(field).valueChanges
            .subscribe(() => {
              control.updateValueAndValidity();
            });
          fieldChanges = true;
        }
        if (control.value === form.get(field).value) {
          return null;
        } else {
          return { not_matching: true };
        }
      };
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { invalidPassword: true };
        }
    }
}
