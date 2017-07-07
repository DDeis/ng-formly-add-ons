import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldType, FormlyConfig, FormlyFieldConfig } from 'ng-formly';

@Component({
  selector: 'formly-multilang-field',
  template: `
    <!--[model]="model"-->
    <formly-form [model]="model" [fields]="fields" [form]="control" [options]="newOptions" [buildForm]="false"></formly-form>
  `,
})
export class FormlyMultilangField extends FieldType implements OnInit {

  fields: FormlyFieldConfig[];
  selectedlang;

  get control() {
    return this.form.get(this.to.key);
  }

  get newOptions() {
    return { ...this.options };
  }

  constructor(private formlyConfig: FormlyConfig) {
    super();
  }

  ngOnInit() {
    (<FormGroup> this.form).addControl(this.to.key, new FormGroup({}));

    this.selectedlang = this.to.selectedLang;

    const control = <FormGroup> this.form.get(this.to.key);

    const fields = [];

    // Add config component and wrappers to field
    this.formlyConfig.getMergedField(this.to.field)

    // For each lang create a new field and FormControl
    this.to.languages.forEach(lang => {

      const newField = Object.assign(
        {},
        this.to.field,
        {
          key: lang.code,
          hideExpression: () => this.to.hideExpression(lang.code),
        });

      control.addControl(lang.code, new FormControl(undefined));

      fields.push(newField);
    });

    this.model;
    debugger;

    this.fields = fields;
  }
}
