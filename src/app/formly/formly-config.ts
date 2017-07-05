import { FormlyFieldInput } from './types/input';
import { FormlyFieldTextArea } from './types/textarea';
import { FormlyFieldSelect } from './types/select';
import { FormlyFieldRadio } from './types/radio';
import { FormlyFieldSelectize } from './types/selectize';

import { FormlyHorizontalWrapper } from './wrappers/horizontal.wrapper';
import { FormlyPanelWrapper } from './wrappers/panel.wrapper';
import { FormlyLabelWrapper } from './wrappers/label.wrapper';

import { Validators } from '@angular/forms';

export const formlyConfig = {
  types: [
    {
      name: 'input',
      component: FormlyFieldInput,
    },
    {
      name: 'textarea',
      component: FormlyFieldTextArea,
    },
    {
      name: 'select',
      component: FormlyFieldSelect,
    },
    {
      name: 'radio',
      component: FormlyFieldRadio,
    },
    {
      name: 'selectize',
      component: FormlyFieldSelectize,
      wrappers: ['fieldset', 'label'],
    },
    { name: 'input-horizontal', extends: 'input' },
    { name: 'textarea-horizontal', extends: 'textarea' },
    { name: 'select-horizontal', extends: 'select' },
    { name: 'selectize-horizontal', extends: 'selectize' },
  ],
  validators: [{ name: 'required', validation: Validators.required}],
  validationMessages: [
    { name: 'required', message: (err, field) => `${field.templateOptions.label} is required.`},
    { name: 'invalidEmailAddress', message: 'Invalid Email Address' },
    { name: 'maxlength', message: 'Maximum Length Exceeded.' },
    {
      name: 'minlength',
      message: (err) => `Should have at least ${err.requiredLength} Characters`
    },
    { name: 'not_matching', message: 'Password Not Matching' },
    { name: 'zipCode', message: 'ZIP code should be 5 characters'},
    { name: 'uniqueUsername', message: 'This username is already taken.'},
  ],
  wrappers: [
    {
      name: 'formly-wrapper-horizontal',
      component: FormlyHorizontalWrapper,
      types: [
        'input-horizontal',
        'textarea-horizontal',
        'select-horizontal',
        'radio-button-group-horizontal',
        'datepicker-horizontal',
        'timepicker-horizontal',
        'selectize-horizontal',
      ]
    },
    { name: 'panel', component: FormlyPanelWrapper },
    { name: 'label', component: FormlyLabelWrapper },
  ],
};
