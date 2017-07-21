import { Validators } from '@angular/forms';

import { ConfigOption } from '@ng-formly/core';

import { FormlyFieldInput } from './types/input';
import { FormlyFieldTextArea } from './types/textarea';
import { FormlyFieldSelect } from './types/select';
import { FormlyFieldRadio } from './types/radio';
import { FormlyFieldSelectize } from './types/selectize';

import { FormlyRepeatSection } from './types/repeat-section';
import { FormlyMultilangField } from './types/multilang';

import { FormlyHorizontalWrapper } from './wrappers/horizontal.wrapper';
import { FormlyPanelWrapper } from './wrappers/panel.wrapper';
import { FormlyLabelWrapper } from './wrappers/label.wrapper';

export const CUSTOM_FIELD_TYPE_COMPONENTS = [
  FormlyHorizontalWrapper, FormlyPanelWrapper, FormlyLabelWrapper,

  FormlyFieldInput, FormlyFieldTextArea, FormlyFieldSelect, FormlyFieldRadio,
  FormlyFieldSelectize,
  FormlyRepeatSection, FormlyMultilangField,
];

export const CUSTOM_FORMLY_CONFIG: ConfigOption  = {
  types: [
    { name: 'input', component: FormlyFieldInput },
    { name: 'textarea', component: FormlyFieldTextArea },
    { name: 'select', component: FormlyFieldSelect },
    { name: 'radio', component: FormlyFieldRadio },
    { name: 'selectize', component: FormlyFieldSelectize, wrappers: ['fieldset', 'label'] },

    { name: 'repeat-section', component: FormlyRepeatSection },
    { name: 'multilang-field', component: FormlyMultilangField },

    { name: 'input-horizontal', extends: 'input' },
    { name: 'textarea-horizontal', extends: 'textarea' },
    { name: 'select-horizontal', extends: 'select' },
    { name: 'selectize-horizontal', extends: 'selectize' },
  ],
  validationMessages: [
    { name: 'required', message: getRequiredValidationMessage },
    { name: 'atLeastOneFieldRequired', message: getAtLeastOneFieldRRequiredValidationMessage },
    { name: 'invalidEmailAddress', message: 'Invalid Email Address' },
    { name: 'maxlength', message: 'Maximum Length Exceeded.' },
    { name: 'minlength', message: getMinLengthValidationMessage },
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

export function getRequiredValidationMessage(err, field): string {
  return `${field.templateOptions.label} is required.`;
}

export function getAtLeastOneFieldRRequiredValidationMessage(err, field): string {
  return `At least one ${field.templateOptions.label} is required.`;
}

export function getMinLengthValidationMessage(err): string {
  return `Should have at least ${err.requiredLength} Characters`;
}

export const EXPORT_TEST: any[] = []
