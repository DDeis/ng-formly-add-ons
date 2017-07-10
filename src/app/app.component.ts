import { Component, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import * as _ from 'lodash';

import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { FormlyFieldConfig, FormlyForm } from 'ng-formly';

import { ValidationService } from './validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('langTabs') langTabs: NgbTabset;
  @ViewChild('formly') formly: FormlyForm;

  form: FormGroup;
	model: any;
	fields: Array<FormlyFieldConfig>;

	languages: any[];
	selectedLang: string;

	iptcData: any;
	keywordsOptions: any;

	titleField: FormlyFieldConfig;
	iptcField: FormlyFieldConfig;
	keywordsField: FormlyFieldConfig;

	constructor(private http: Http, private formBuilder: FormBuilder) { }

	ngOnInit() {

    this.form = this.formBuilder.group({});

		this.languages = [
			{ code: 'en', label: 'English' },
			{ code: 'fr', label: 'French' },
			{ code: 'de', label: 'German' },
		];
    this.selectedLang = 'en';

    this.iptcData = [
			{
				id: '0',
				label: 'IPTC 1',
				keywords: {
					en: ['English keyword 1'],
					fr: ['French keyword 1', 'French keyword 2'],
					de: [ ]
				}
			},
			{
				id: '1',
				label: 'IPTC 2',
				keywords: {
					en: ['English keyword 3'],
					fr: ['French keyword 3'],
					de: ['German keyword 3']
				}
			},
			{
				id: '2',
				label: 'Default IPTC',
				keywords: {
					en: ['Default IPTC keyword'],
				}
			},
		];

		this.keywordsOptions = {
			en: [ { item: 'Default IPTC keyword'}],
			fr: [ { item: 'Manual keyword'}],
			de: [ ]
		};

    const model = {
      title: {
        en: 'This is an English Title',
        fr: 'This is a French Title',
      },
      iptc: [ '2' ],
      keywords: {
        en: ['Default IPTC keyword'],
        fr: ['Manual keyword'],
        de: []
      }
    };

    this.model = model;

		this.initFields();

		const fields = [
			this.titleField,
			this.buildFieldGroup('iptc', [
				this.iptcField,
				this.keywordsField
			]),
		];

		this.fields = fields;

	}

	initFields() {

    this.titleField = {
      id: 'title',
      type: 'multilang-field',
      templateOptions: {
        multilangKey: 'title',
        languages: this.languages,
        selectedLang: this.selectedLang,
				field: {
	        type: 'input',
	        templateOptions: {
	          label: 'Title (multi)',
	          placeholder: 'Title',
	          inputClassName: 'form-control-sm',
	        },
	      },
				validators: {
          validation: Validators.compose([ValidationService.atLeastOneFieldValidator]),
        },
        hideExpression: lang => lang !== this.selectedLang,
      },
      fieldGroup: [],
    };

    this.iptcField = {
			key: 'iptc',
			type: 'selectize',
			templateOptions: {
				label: 'IPTC',
				placeholder: 'IPTC',
				selectizeClassName: 'selectize-sm',
				value: this.model.iptc,
				config: {
					options: this.iptcData,
					valueField: 'id',
					labelField: 'label',
					searchField: 'label',
					maxItems: null,
					create: false,
					persist: false,
					plugins: [ 'remove_button' ],
					onItemAdd: (item) => {
						this.onChangeIPTC(item, (keywords, iptcKeywords, lang) => {
							// transform IPTC keywords to options and add them to the keywords options
							this.addKeywords(this.keywordsOptions, iptcKeywords, lang, this.keywordToOption);

							// Add IPTC keywords to the keywords model
							this.addKeywords(keywords, iptcKeywords, lang);

						});
					},
					onItemRemove: (value) => {
						this.onChangeIPTC(value, (keywords, iptcKeywords, lang) => {
							// Remove IPTC keywords to the keywords model
							this.removeKeywords(keywords, iptcKeywords, lang);
						});

					},
				},
				required: true,
			}
		};

    this.keywordsField = {
      id: 'keywords',
      type: 'multilang-field',
      templateOptions: {
        multilangKey: 'keywords',
        languages: this.languages,
        selectedLang: this.selectedLang,
        field: {
          type: 'selectize',
          templateOptions: {
            label: 'Keywords (multi)',
            placeholder: 'Keywords',
            selectizeClassName: 'selectize-sm',
            config: {
              maxItems: null,
              create: (input, callback) => {
                const option = {item: input};

                if (!this.keywordsOptions[this.selectedLang]) {
                  this.keywordsOptions[this.selectedLang] = [];
                }

                this.keywordsOptions[this.selectedLang].push(option);
                callback(option);
              },
              labelField: 'item',
              valueField: 'item',
              searchField: [ 'item' ],
              plugins: [ 'remove_button' ],
            },
						fetchOptions: lang => this.keywordsOptions[lang],
            fetchValue: lang => this.model.keywords && this.model.keywords[lang],
          },
        },
        hideExpression: lang => lang !== this.selectedLang,
      },
      fieldGroup: [],
    };

	}

	onChangeLang(payload: NgbTabChangeEvent): void {
		this.selectedLang = payload.nextId;
	}

	submit(model) {
		console.group('submit');
		console.log('model', model);
		console.log('form', this.form);
		console.groupEnd();
	}

	/**
	 * Add or Remove keywords on IPTC change
	 * @param iptcID
	 * @param method
	 */
	private onChangeIPTC(
		iptcID: string,
		method: (target: any, origin: any, lang: string) => void
	): void {
		const iptcItem = this.iptcData[iptcID];
		const iptcKeywords = iptcItem && iptcItem.keywords || {};

		// For each IPTC keywords lang
		for(let lang in iptcKeywords) {
			// Call add or remove method
			method(this.model.keywords, iptcKeywords, lang);
		}

    const keywords = Object.assign({}, this.model.keywords);

		this.form.patchValue({keywords: keywords});

	}

	/**
	 * Add origin keywords to target
	 * @param target
	 * @param origin
	 * @param lang
	 * @param map
	 */
	private addKeywords(target: any, origin: any, lang: string, map?): void {
		if(!target || !origin || !lang) {
			return;
		}

		const keywords = map && typeof map === 'function' ? origin[lang].map(map) : origin[lang];

		if(!target[lang]) {
			target[lang] = [];
		}

		const keywordsToAdd = _.difference(keywords, target[lang])
		target[lang].push(...keywordsToAdd);
	}

	/**
	 * Remove origin keywords from target
	 * @param target
	 * @param origin
	 * @param lang
	 */
	private removeKeywords(target: any, origin: any, lang: string): void {
		if(!target || !origin || !lang) {
			return;
		}

		_.remove(target[lang], elem => origin[lang].indexOf(elem) != -1);
	}

	/**
	 * Transform a keyword in a keywordOption for selectize
	 * @param keyword
	 * @return {{item: string}}
	 */
	private keywordToOption(keyword: string): any {
		return { item: keyword };
	}

	private buildFieldGroup(id: string, fields: FormlyFieldConfig[], options?: { fieldClassNames?: string[] }): FormlyFieldConfig {

		// Apply 'col' class or specified class
		fields.forEach((field, index) => {
			field.className = options && options.fieldClassNames
				? options.fieldClassNames[index]
				: 'col';
		});

		const group = {
			id: id,
			fieldGroupClassName: 'row',
			fieldGroup: fields
		};

		return group;
	}
}
