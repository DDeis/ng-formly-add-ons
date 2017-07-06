import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { NgSelectizeModule } from 'ng-selectize';

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

import { formlyConfig } from './formly-config';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,

    NgSelectizeModule,

    FormlyModule.forRoot(formlyConfig),
    FormlyBootstrapModule,
  ],
  declarations: [
    FormlyHorizontalWrapper, FormlyPanelWrapper, FormlyLabelWrapper,
    FormlyFieldInput, FormlyFieldTextArea, FormlyFieldSelect, FormlyFieldRadio,
    FormlyFieldSelectize,
    FormlyRepeatSection, FormlyMultilangField,
  ],
  exports: [ FormlyModule, FormlyBootstrapModule ]
})
export class FormlyCustomModule { }
