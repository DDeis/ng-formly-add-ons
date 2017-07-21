import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { FieldWrapper } from '@ng-formly/core';

@Component({
  selector: 'formly-wrapper-horizontal',
  template: `
    <div class="form-group row" [ngClass]="{'has-danger': valid}">
      <label [attr.for]="key" class="col-sm-2 col-form-label">
        {{ to.label }}<span *ngIf="isRequired()" class="text-danger">*</span>
      </label>
      <div class="col">
        <ng-template #fieldComponent></ng-template>
      </div>
    </div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {

  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;

  isRequired(): boolean {
    return !!this.to.required;
  }
}
