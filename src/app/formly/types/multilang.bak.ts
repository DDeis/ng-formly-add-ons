import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

import { FieldType, FormlyConfig, FormlyFieldConfig } from 'ng-formly';

@Component({
  selector: 'formly-multilang-field',
  template: `
      <formly-form [model]="model" [fields]="fields" [form]="control" [options]="newOptions" [buildForm]="false"></formly-form>
  `,
})
export class FormlyMultilangField extends FieldType implements OnInit, OnChanges {

  fields: FormlyFieldConfig[];

  // get controls() {
  //   const controls = this.form.get(this.to.key)['controls']
  //
  //   return controls;
  // }

  get control() {
    const control = this.form.get(this.to.key);

    return control;
  }

  get newOptions() {
    return { ...this.options };
  }

  constructor(private formlyConfig: FormlyConfig) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    (<FormGroup> this.form).addControl(this.to.key, new FormGroup({}));

    const fields = this.buildMultilangField(this.to.key, this.to.field, this.to.languages);

    this.fields = fields;
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if(changes['model']) {
      console.log('model change', this.model);
    }
  }


  // ngOnInit() {
  //   (<FormGroup> this.form).addControl(this.to.key, new FormGroup({}));
  //
  //   const fields = this.buildMultilangField(this.to.key, this.to.field, this.to.languages);
  //
  //   this.fields = fields;
  // }

  private buildMultilangField(multilangFieldKey: string, baseField: FormlyFieldConfig, languages: any[]): FormlyFieldConfig[] {

    const fields = [];

    const control = <FormGroup> this.form.get(multilangFieldKey);

    // Add config component and wrappers to field
    this.formlyConfig.getMergedField(baseField);

    // For each lang create a new field and FormControl
    languages.forEach(lang => {

      const newField = Object.assign(
        {},
        baseField,
        {
          key: lang.code,
          hideExpression: () => this.to.hideExpression(lang.code),
          lifecycle: {
            onChanges: (changes) => {
              console.log('onChange', changes);
              this.model = control.value;
            },
          },
        });

      control.addControl(lang.code, new FormControl(undefined));
      const nestedControl = <FormControl> control.get(lang.code);
      nestedControl.registerOnChange(() => {
        console.log('control value changed', lang.code);
        console.log('change', control.value, this.model);
          setTimeout(() => {
              // // if (!_.isEqual(control.value, this.model)) {
              //   this.model = control.value;
              // // }
            });
      });

      fields.push(newField);
    });

    return fields;
  }
}
