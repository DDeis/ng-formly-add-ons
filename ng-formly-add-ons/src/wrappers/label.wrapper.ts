import { Component } from '@angular/core';

import { FieldWrapper } from '@ng-formly/core';

@Component({
  selector: 'formly-wrapper-label',
  template: `
    <label [attr.for]="id" class="form-control-label">
        {{ to.label }}<span *ngIf="isRequired()" class="text-danger">*</span>
    </label>
    <ng-container #fieldComponent></ng-container>
  `,
})
export class FormlyLabelWrapper extends FieldWrapper {
  isRequired(): boolean {
    return !!this.to.required;
  }
}
