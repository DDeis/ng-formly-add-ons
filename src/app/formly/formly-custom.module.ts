import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { NgSelectizeModule } from 'ng-selectize';

import { CUSTOM_FORMLY_CONFIG, CUSTOM_FIELD_TYPE_COMPONENTS } from './formly-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,

    NgSelectizeModule,

    FormlyModule.forRoot(CUSTOM_FORMLY_CONFIG),
    FormlyBootstrapModule,
  ],
  declarations: [
    ...CUSTOM_FIELD_TYPE_COMPONENTS,
  ],
  exports: [ FormlyModule, FormlyBootstrapModule ]
})
export class FormlyCustomModule { }
