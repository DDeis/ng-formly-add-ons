import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FormlyModule, FormlyBootstrapModule } from 'ng-formly'; // => TypeError: Cannot read property 'path' of undefined at TsickleCompilerHost.getSourceMapKeyForSourceFile
import { NgSelectizeModule } from 'ng-selectize';

// import { CUSTOM_FORMLY_CONFIG, CUSTOM_FIELD_TYPE_COMPONENTS } from './formly-add-ons-config'; // => TypeError: Cannot read property 'path' of undefined at TsickleCompilerHost.getSourceMapKeyForSourceFile
import { EXPORT_TEST } from './formly-add-ons-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,

    NgSelectizeModule,

    // FormlyModule.forRoot(CUSTOM_FORMLY_CONFIG),
    // FormlyBootstrapModule,
  ],
  declarations: [
    // ...CUSTOM_FIELD_TYPE_COMPONENTS,
  ],
  exports: [
    // FormlyModule, FormlyBootstrapModule,
    // ...CUSTOM_FIELD_TYPE_COMPONENTS
  ]
})
export class FormlyAddOnsModule {
  // public static forRoot(): ModuleWithProviders {
  //
  //   return {
  //     ngModule: FormlyAddOnsModule,
  //   };
  // }
}
