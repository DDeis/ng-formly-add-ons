import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from 'ng-formly';

import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let control of formControl.controls; let i = index;">
      <formly-form
        [model]="model[i]"
        [fields]="fields(i)"
        [options]="newOptions"
        [form]="formControl.at(i)"
        [ngClass]="field.fieldArray.fieldGroupClassName">
      </formly-form>
      <div class="mb-3">
        <button class="btn" [ngClass]="removeButtonClass" (click)="remove(i)">
          <i *ngIf="removeButtonIcon" class="fa" [ngClass]="removeButtonIcon"></i>
          {{ removeButtonText }}
        </button>
      </div>
    </div>
    <div class="mb-3">
      <button class="btn" [ngClass]="addButtonClass" (click)="add()">
        <i *ngIf="addButtonIcon" class="fa" [ngClass]="addButtonIcon"></i>
        {{ addButtonText }}
      </button>
    </div>
    `,
})
export class FormlyRepeatSection extends FieldType implements OnInit {

  formControl: FormArray;

  private _fields = [];

  get newOptions() {
    return Object.assign({}, this.options);
  }

  get newFields() {
    return cloneDeep(this.field.fieldArray.fieldGroup);
  }

  get addButtonText(): string {
    return this.to.addButtonText || '';
  }

  get addButtonIcon(): string {
    return this.to.addButtonIcon;
  }

  get addButtonClass(): string {
    return this.to.addButtonClassName || 'btn-primary';
  }

  get removeButtonText(): string {
    return this.to.removeButtonText || '';
  }

  get removeButtonIcon(): string {
    return this.to.removeButtonIcon;
  }

  get removeButtonClass(): string {
    return this.to.removeButtonClassName || 'btn-danger';
  }

  constructor(private formlyFormBuilder: FormlyFormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.model) {
      this.model.map(() => this.add());
    }

    if(this.to.autoAddSection) {
      const formArray: FormArray = <FormArray> this.form.get(this.field.key);

      formArray.valueChanges.subscribe(() => {
        setTimeout(() => {
          if(formArray.valid) {
            this.add();
          }
        });
      });
    }
  }

  add() {
    const form = new FormGroup({}),
      index: number = this._fields.length;

    if (!this.model[index]) {
      this.model.push({});
    }

    this._fields.push(this.newFields);
    this.formlyFormBuilder.buildForm(form, this._fields[index], this.model[index], this.newOptions);
    this.formControl.push(form);
  }

  remove(index) {
    this.formControl.removeAt(index);
    this.model.splice(index, 1);
    this._fields.splice(index, 1);
  }

  fields(index) {
    if (this._fields[index]) {
      return this._fields[index];
    }

    this._fields.splice(index, 0, this.newFields);

    return this._fields[index];
  }
}
