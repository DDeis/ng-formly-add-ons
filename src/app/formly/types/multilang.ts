import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldType, FormlyConfig, FormlyFieldConfig } from 'ng-formly';

@Component({
  selector: 'formly-multilang-field',
  template: `
    <!--<div *ngFor="let control of controls; let i = index;">-->
      <formly-form [model]="model" [fields]="fields" [form]="control" [options]="newOptions" [buildForm]="false"></formly-form>
    <!--</div>-->
  `,
})
export class FormlyMultilangField extends FieldType implements OnInit {

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
    (<FormGroup> this.form).addControl(this.to.key, new FormGroup({}));

    const fields = this.buildMultilangField(this.to.key, this.to.field, this.to.languages);

    this.fields = fields;
  }

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
        });

      control.addControl(lang.code, new FormControl(undefined));

      fields.push(newField);
    });

    return fields;
  }
}
