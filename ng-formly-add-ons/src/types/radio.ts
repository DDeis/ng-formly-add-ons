import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { FormlyFieldRadio as OriginalFormlyFieldRadio } from 'ng-formly';

@Component({
  selector: 'formly-field-radio',
  template: `
    <div [formGroup]="form">
      <div *ngFor="let option of to.options" class="form-check">
        <label [ngClass]="labelClass">
          <input type="radio" 
                 [ngClass]="inputClass" 
                 [name]="id" 
                 [value]="option.key" 
                 [formControl]="formControl" 
                 [formlyAttributes]="field">
          {{ option.value }}
          <span [ngClass]="indicatorClass"></span>
        </label>
      </div>
    </div>
  `,
})
export class FormlyFieldRadio extends OriginalFormlyFieldRadio {

  get labelClass(): string {
    return this.to.labelClass || 'custom-control custom-radio';
  }

  get inputClass(): string {
    return this.to.inputClass || 'custom-control-input';
  }

  get indicatorClass(): string {
    return this.to.inputClass || 'custom-control-indicator';
  }
}
