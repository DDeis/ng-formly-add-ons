import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { FieldType } from 'ng-formly';

@Component({
  selector: 'formly-selector',
  template: `
		<ng-selectize class="selectize"
								 	[ngClass]="selectizeClass"
									[config]="config"
									[options]="selectizeOptions"
									[placeholder]="placeholder"
									[noOptionsPlaceholder]="noOptionsPlaceholder"
									[hasOptionsPlaceholder]="hasOptionsPlaceholder"
									[enabled]="enabled"
									[errorClass]="errorClass"
									[optionGroups]="optionGroups"
									[ngModel]="value"
		              [formControl]="formControl"
		              [formlyAttributes]="field">
		</ng-selectize>
  `,
})
export class FormlyFieldSelectize extends FieldType {

  get config() {
    return this.to.config || null;
  }

  get selectizeOptions(): any[] {
    return this.to.options || null;
  }

  get placeholder(): string {
    return this.to.placeholder || '';
  }

  get noOptionsPlaceholder(): string {
    return this.to.noOptionsPlaceholder || '';
  }

  get hasOptionsPlaceholder(): string {
    return this.to.hasOptionsPlaceholder || '';
  }

  get enabled(): boolean {
    return !this.to.disabled;
  }

  get errorClass(): string {
    return this.to.errorClass || 'has-error';
  }

  get optionGroups(): Object {
    return this.to.optionGroups || null;
  }

  get selectizeClass(): string {
    return this.to.selectizeClassName || '';
  }

  get value() {
    return this.to.value || null;
  }

}
