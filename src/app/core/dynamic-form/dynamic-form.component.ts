import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField } from './form-field.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input() formFields: FormField[] = [];
  @Input() formTitle: string = '';
  @Input() initialData: any;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  showSuccess: boolean = false;

  ngOnInit() {
    // ensure form is created if formFields were already provided
    if (this.formFields && this.formFields.length) {
      this.createForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if formFields input arrives/changes, (re)create the form so controls exist
    if (changes['formFields'] && this.formFields && this.formFields.length) {
      this.createForm();
    }

    // when initial data changes, patch values into the existing form
    if (changes['initialData'] && this.form) {
      // guard: only patch if initialData is an object
      if (this.initialData) {
        this.form.patchValue(this.initialData);
      }
    }
  }

  createForm() {
    const formGroup: { [key: string]: FormControl } = {};
    this.formFields.forEach(field => {
      const value = this.initialData ? this.initialData[field.name] : '';
      const validators = [] as any[];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      // phone: digits, plus, hyphen, parentheses and spaces
      if (field.type === 'phone') validators.push(Validators.pattern('^[0-9+\\-() ]+$'));
      if (field.pattern) validators.push(Validators.pattern(field.pattern));
      formGroup[field.name] = new FormControl(value, validators);
    });
    this.form = new FormGroup(formGroup);
  }

  @Input() submitButtonText: string = 'Submit';
  @Input() resetOnSubmit: boolean = false;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      if (this.resetOnSubmit) {
        this.form.reset();
        // show a transient success banner for better UX
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
      }
    }
  }

  shouldDisplay(field: FormField): boolean {
    if (field.conditionalDisplay) {
      return field.conditionalDisplay(this.form.value);
    }
    return true;
  }

  getControl(name: string) {
    return this.form.get(name);
  }
}
