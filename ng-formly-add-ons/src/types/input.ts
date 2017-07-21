import { Component } from '@angular/core';

import { FieldType } from '@ng-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
      <input class="form-control"
             [type]="type"
             [formControl]="formControl"
             [formlyAttributes]="field"
             [ngClass]="inputClass" />
    `,
})
export class FormlyFieldInput extends FieldType {

  get type() {
    return this.to.type || 'text';
  }

  get inputClass(): string|string[] {

    const inputClass: string[] = this.to.inputClassName ? [ this.to.inputClassName ] : [];

    if(this.valid) {
      inputClass.push('form-control-danger');
    }

    return inputClass;
  }
}
