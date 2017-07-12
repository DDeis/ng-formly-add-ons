import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from 'ng-formly';

import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let control of formControl.controls; let i = index;">
      <formly-form
        [model]="model[i]"
        [fields]="fields(i)"
        [options]="newOptions"
        [form]="formControl.at(i)"
        [ngClass]="field.fieldArray.fieldGroupClassName">
      </formly-form>
      <div class="mb-3">
        <button class="btn" [ngClass]="removeButtonClass" (click)="remove(i)">
          <i *ngIf="removeButtonIcon" class="fa" [ngClass]="removeButtonIcon"></i>
          {{ removeButtonText }}
        </button>
      </div>
    </div>
    <div class="mb-3">
      <button class="btn" [ngClass]="addButtonClass" (click)="add()">
        <i *ngIf="addButtonIcon" class="fa" [ngClass]="addButtonIcon"></i>
        {{ addButtonText }}
      </button>
    </div>
    `,
})
export class FormlyRepeatSection extends FieldType implements OnInit {

  formControl: FormArray;
  _fields = [];

  get newOptions() {
    return Object.assign({}, this.options);
  }

  get newFields() {
    return cloneDeep(this.field.fieldArray.fieldGroup);
  }

  get addButtonText(): string {
    return this.to.addButtonText || '';
  }

  get addButtonIcon(): string {
    return this.to.addButtonIcon;
  }

  get addButtonClass(): string {
    return this.to.addButtonClassName || 'btn-primary';
  }

  get removeButtonText(): string {
    return this.to.removeButtonText || '';
  }

  get removeButtonIcon(): string {
    return this.to.removeButtonIcon;
  }

  get removeButtonClass(): string {
    return this.to.removeButtonClassName || 'btn-danger';
  }

  constructor(private formlyFormBuilder: FormlyFormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.model) {
      this.model.map(() => this.add());
    }

    if(this.to.autoAddSection) {
      const formArray: FormArray = <FormArray> this.form.get(this.field.key);

      formArray.valueChanges.subscribe(() => {
        console.count()
        setTimeout(() => {
          if(formArray.valid) {
            this.add();
          }
        });
      });
    }
  }

  add() {
    const form = new FormGroup({}),
      index: number = this._fields.length;

    if (!this.model[index]) {
      this.model.push({});
    }

    this._fields.push(this.newFields);
    this.formlyFormBuilder.buildForm(form, this._fields[index], this.model[index], this.newOptions);
    this.formControl.push(form);
  }

  remove(index) {
    this.formControl.removeAt(index);
    this.model.splice(index, 1);
    this._fields.splice(index, 1);
  }

  fields(index) {
    if (this._fields[index]) {
      return this._fields[index];
    }

    this._fields.splice(index, 0, this.newFields);

    return this._fields[index];
  }
}

// @Component({
//   selector: 'formly-repeat-section',
//   template: `
//     <div *ngFor="let control of controls; let i = index;" >
//       <formly-form
//         [model]="model[i]"
//         [fields]="fields"
//         [form]="control"
//         [ngClass]="field.fieldArray.className">
//       </formly-form>
//       <div class="mb-3">
//         <button class="btn" [ngClass]="removeButtonClass" (click)="remove(i)">
// 					<i *ngIf="removeButtonIcon" class="fa" [ngClass]="removeButtonIcon"></i>
// 					{{ removeButtonText }}
// 				</button>
//       </div>
//     </div>
//     <div class="mb-3">
// 			<button class="btn" [ngClass]="addButtonClass" (click)="add()">
// 				<i *ngIf="addButtonIcon" class="fa" [ngClass]="addButtonIcon"></i>
// 				{{ addButtonText }}
// 			</button>
//     </div>
//   `,
// })
// export class FormlyRepeatSection extends FieldType implements OnInit {
//
//   get controls() {
// 		const formArray: FormArray = <FormArray> this.form.get(this.field.key);
//     return formArray.controls;
//   }
//
//   get fields(): FormlyFieldConfig[] {
//     return this.field.fieldArray.fieldGroup;
//   }
//
// 	get removeButtonText(): string {
// 		return this.field.fieldArray.templateOptions.removeButtonText || '';
// 	}
//
// 	get removeButtonIcon(): string {
// 		return this.field.fieldArray.templateOptions.removeButtonIcon;
// 	}
//
// 	get removeButtonClass(): string {
// 		return this.field.fieldArray.templateOptions.removeButtonClassName || 'btn-danger';
// 	}
//
// 	get addButtonText(): string {
// 		return this.field.fieldArray.templateOptions.addButtonText || '';
// 	}
//
// 	get addButtonIcon(): string {
// 		return this.field.fieldArray.templateOptions.addButtonIcon;
// 	}
//
// 	get addButtonClass(): string {
// 		return this.field.fieldArray.templateOptions.addButtonClassName || 'btn-primary';
// 	}
//
//   ngOnInit() {
//     if (this.model) {
//       this.model.map(() => {
//         let formGroup = new FormGroup({});
//         this.form.controls[this.field.key]['controls'].push(formGroup);
//       });
//     }
//
// 		let subscribed = false;
//
// 		if(!subscribed) {
// 			const formArray: FormArray = <FormArray> this.form.get(this.field.key);
// 				console.count()
//
// 			formArray.valueChanges.subscribe(() => {
// 				console.log(formArray.valid, formArray)
// 				setTimeout(() => {
// 					// if(formArray.valid) {
// 					// 	this.add();
// 					// }
// 				});
// 			});
//
// 				subscribed = true;
// 		}
//
// 		const formArray: FormArray = <FormArray> this.form.get(this.field.key);
//   }
//
//   add() {
// 		const formArray: FormArray = <FormArray> this.form.get(this.field.key);
//     const formGroup = new FormGroup({});
//
//     this.model.push({});
//     formArray.push(formGroup);
//   }
//
//   remove(i) {
// 		const formArray: FormArray = <FormArray> this.form.get(this.field.key);
//
//     formArray.removeAt(i);
//     this.model.splice(i, 1);
//   }
// }
