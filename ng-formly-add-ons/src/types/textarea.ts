import { Component } from '@angular/core';

import { FieldType } from '@ng-formly/core';

@Component({
  selector: 'formly-field-textarea',
  template: `
    <textarea class="form-control"
              [ngClass]="textareaClass"
              [name]="key"
              [formControl]="formControl"
              [cols]="to.cols"
              [rows]="to.rows"
              [formlyAttributes]="field">
    </textarea>
  `,
})
export class FormlyFieldTextArea extends FieldType {

  get textareaClass(): string {
    return this.to.textareaClassName || '';
  }

}
