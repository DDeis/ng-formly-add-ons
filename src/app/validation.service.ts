import { FormGroup } from '@angular/forms';

export class ValidationService {
    static getValidatorErrorMessage(code: string) {
        let config = {
            required: 'Required',
            invalidCreditCard: 'Is invalid credit card number',
            invalidEmailAddress: 'Invalid email address',
            invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.'
        };

        return config[code];
    }

    static atLeastOneFieldValidator(form: FormGroup) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        const controls = form.controls;
debugger
				for(let key in controls) {
					if(form.get(key).value) {
						return null
					}
				}

        return { required: true };
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
