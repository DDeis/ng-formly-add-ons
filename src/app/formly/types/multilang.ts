import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import * as _ from 'lodash';

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

    languages.forEach(lang => {
      const newField: FormlyFieldConfig = Object.assign(
        {},
        _.cloneDeep(baseField),
        {
          id: `${multilangFieldKey}-${lang.code}`,
          key: lang.code,
          // hideExpression: () => this.to.hideExpression(lang.code),
        });


      newField.templateOptions.label = `${newField.templateOptions.label} ${lang.code}`;

      // if(this.model) {
      //   newField.templateOptions.value = this.model[lang.code];
      // }

      if(newField.type === 'selectize') {
				newField.templateOptions.options = newField.templateOptions.fetchOptions(lang.code);
				newField.templateOptions.value = newField.templateOptions.fetchValue(lang.code);

				// const value = newField.templateOptions.value;
				// const options = newField.templateOptions.config.options;
				//
				// newField.templateOptions.config.options = options && options[lang.code];
				// newField.templateOptions.value = value && value[lang.code];

      }

      field.fieldGroup.push(newField);
    });

    this.fields = [ field ];
  }
}
