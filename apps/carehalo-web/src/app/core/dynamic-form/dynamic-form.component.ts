import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
    if (this.formFields && this.formFields.length) {
      this.createForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if (changes['formFields'] && this.formFields && this.formFields.length) {
        this.createForm();
      }

      if (changes['initialData'] && this.form && this.initialData) {
        this.form.patchValue(this.initialData);
      }
    }, 0);
  }

  createForm() {
    this.form = new FormGroup({});
    this.formFields.forEach(field => {
      this.createControl(field);
    });
  }

  createControl(field: FormField) {
    const { name, required, type, pattern } = field;
    const validators = [] as any[];
    if (required) validators.push(Validators.required);
    if (type === 'email') validators.push(Validators.email);
    if (type === 'phone') validators.push(Validators.pattern('^[0-9+\\-() ]+$'));
    if (pattern) validators.push(Validators.pattern(pattern));

    if (name.includes('.')) {
      const parts = name.split('.');
      let currentGroup: FormGroup = this.form;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!currentGroup.get(parts[i])) {
          currentGroup.addControl(parts[i], new FormGroup({}));
        }
        currentGroup = currentGroup.get(parts[i]) as FormGroup;
      }
      currentGroup.addControl(parts[parts.length - 1], new FormControl(this.getInitialValue(name), validators));
    } else {
      this.form.addControl(name, new FormControl(this.getInitialValue(name), validators));
    }
  }

  getInitialValue(name: string): any {
    if (!this.initialData) {
      return '';
    }
    if (name.includes('.')) {
      return name.split('.').reduce((acc, part) => acc && acc[part], this.initialData) || '';
    }
    return this.initialData[name] || '';
  }

  @Input() submitButtonText: string = 'Submit';
  @Input() resetOnSubmit: boolean = false;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      if (this.resetOnSubmit) {
        this.form.reset();
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

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
