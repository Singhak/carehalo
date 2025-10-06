import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class DynamicFormComponent implements OnChanges {
  @Input() formFields: FormField[] = [];
  @Input() formTitle: string = '';
  @Input() initialData: any;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.form) {
      this.form.patchValue(this.initialData);
    }
  }

  createForm() {
    const formGroup: { [key: string]: FormControl } = {};
    this.formFields.forEach(field => {
      const value = this.initialData ? this.initialData[field.name] : '';
      const validators = field.required ? [Validators.required] : [];
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
      }
    }
  }

  shouldDisplay(field: FormField): boolean {
    if (field.conditionalDisplay) {
      return field.conditionalDisplay(this.form.value);
    }
    return true;
  }
}
