import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';

import { FormlyCustomModule } from '@ddeis/ng-formly-add-ons';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectizeModule,
    NgbModule.forRoot(),
    FormlyCustomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
