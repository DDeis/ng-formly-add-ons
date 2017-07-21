import { Component } from '@angular/core';

import { FieldType } from '@ng-formly/core';

@Component({
  selector: 'formly-field-select',
  template: `
    <select class="form-control"
            [ngClass]="selectClass"
            [formControl]="formControl"
            [formlyAttributes]="field">
      <option value="" *ngIf="to.placeholder">{{ to.placeholder }}</option>
      <ng-container *ngFor="let item of selectOptions">
        <optgroup *ngIf="item.group" label="{{item.label}}">
          <option *ngFor="let child of item.group"
                 [value]="child.value"
                 [disabled]="item.disabled">
            {{ child.label }}
          </option>
        </optgroup>
        <option *ngIf="!item.group"
               [value]="item.value"
               [disabled]="item.disabled">
            {{ item.label }}
        </option>
      </ng-container>
    </select>
  `,
})
export class FormlyFieldSelect extends FieldType {

  get selectClass(): string {
    return this.to.selectClassName || '';
  }

}
