import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { FieldType, FormlyFormBuilder, FormlyConfig, FormlyFieldConfig } from 'ng-formly';

@Component({
  selector: 'formly-multilang-field',
  template: `
      <formly-form [fields]="fields"
                   [model]="model"
                   [form]="formlyGroup"
                   [options]="newOptions">
      </formly-form>
  `,
})
export class FormlyMultilangField extends FieldType implements OnInit, OnChanges {

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

  constructor(private formlyConfig: FormlyConfig, private formlyBuilder: FormlyFormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildMultilangField(this.to.multilangKey, this.to.field, this.to.languages, this.to.validators);
  }

  private buildMultilangField(multilangFieldKey: string, baseField: FormlyFieldConfig, languages: any[], validators: any): void {

    const field = {
      key: multilangFieldKey,
      fieldGroup: [],
			validators: validators || {},
    };

		const fields = [];

    languages.forEach(lang => {
      const newField: FormlyFieldConfig = Object.assign(
        {},
        _.cloneDeep(baseField),
        {
          id: `${multilangFieldKey}-${lang.code}`,
          key: lang.code,
        });

      newField.templateOptions.label = `${newField.templateOptions.label} ${lang.code}`;

      if(newField.type === 'selectize') {
				newField.templateOptions.options = newField.templateOptions.fetchOptions(lang.code);
				newField.templateOptions.value = newField.templateOptions.fetchValue(lang.code);
      }

      field.fieldGroup.push({
        fieldGroup: [newField],
        hideExpression: () => this.to.hideExpression(lang.code),
      });
    });

    this.fields = [ field ];
  }
}
