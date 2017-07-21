import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormlyModule } from '@ng-formly/core';
import { NgSelectizeModule } from 'ng-selectize';

import { CUSTOM_FORMLY_CONFIG, CUSTOM_FIELD_TYPE_COMPONENTS } from './formly-add-ons-config'; // => TypeError: Cannot read property 'path' of undefined at TsickleCompilerHost.getSourceMapKeyForSourceFile

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,

    NgSelectizeModule,

    FormlyModule.forRoot(CUSTOM_FORMLY_CONFIG),
  ],
  declarations: [
    ...CUSTOM_FIELD_TYPE_COMPONENTS,
  ],
  exports: [
    FormlyModule,
  ]
})
export class FormlyAddOnsModule { }
