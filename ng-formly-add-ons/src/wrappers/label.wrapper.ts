import { Component } from '@angular/core';
import { FormlyWrapperLabel as OriginalFormlyWrapperLabel } from 'ng-formly';

@Component({
  selector: 'formly-wrapper-label',
  template: `
    <label [attr.for]="id" class="form-control-label">
        {{ to.label }}<span *ngIf="isRequired()" class="text-danger">*</span>
    </label>
    <ng-container #fieldComponent></ng-container>
  `,
})
export class FormlyLabelWrapper extends OriginalFormlyWrapperLabel {
  isRequired(): boolean {
    return !!this.to.required;
  }
}
