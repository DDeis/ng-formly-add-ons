import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FieldType, FormlyConfig, FormlyFieldConfig } from 'ng-formly';

@Component({
  selector: 'formly-multilang-field',
  template: `
      <formly-form [fields]="fields" 
                   [model]="model" 
                   [form]="formlyGroup" 
                   [options]="newOptions" 
                   [buildForm]="true">
      </formly-form>
  `,
})
export class FormlyMultilangField extends FieldType implements OnInit {

  fields;

  get newOptions() {
    return { ...this.options };
  }

  get formlyGroup(): AbstractControl {
    if (this.field.formControl) {
      return this.field.formControl;
    } else {
      return this.form;
    }
  }

  constructor(private formlyConfig: FormlyConfig) {
    super();
  }

  ngOnInit() {
    this.buildMultilangField(this.to.multilangKey, this.to.field, this.to.languages);
  }

  private buildMultilangField(multilangFieldKey: string, baseField: FormlyFieldConfig, languages: any[]): void {

    const field = {
      key: multilangFieldKey,
      fieldGroup: [],
    };

    // Add config component and wrappers to field
    // this.formlyConfig.getMergedField(baseField);

    // For each lang create a new field and FormControl
    languages.forEach(lang => {

      const newField = Object.assign(
        {},
        baseField,
        {
          key: lang.code,
          hideExpression: () => this.to.hideExpression(lang.code),
        });
      field.fieldGroup.push(newField);
    });

    this.fields = [ field ];
  }
}
