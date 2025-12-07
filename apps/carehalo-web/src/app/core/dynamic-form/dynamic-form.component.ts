import { ChangeDetectorRef, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.formFields && this.formFields.length) {
      this.createForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formFields'] && !changes['formFields'].firstChange) {
      this.updateFormControls();
    }

    if (changes['initialData'] && this.form && this.initialData) {
      this.form.patchValue(this.initialData);
      this.cdr.detectChanges();
    }
  }

  createForm() {
    this.form = new FormGroup({});
    this.formFields.forEach(field => {
      this.createControl(field);
    });

    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  updateFormControls() {
    const existingControls = Object.keys(this.form.controls);
    const newFieldNames = this.formFields.map(f => f.name);

    // Remove controls that are no longer in formFields
    existingControls.forEach(controlName => {
      if (!newFieldNames.includes(controlName)) {
        this.form.removeControl(controlName);
      }
    });

    // Add new controls
    this.formFields.forEach(field => {
      if (!this.form.get(field.name)) {
        this.createControl(field);
      }
    });
  }

  createControl(field: FormField) {
    const { name, required, type, pattern } = field;
    const validators = [] as any[];
    if (required) validators.push(Validators.required);
    if (type === 'email') validators.push(Validators.email);
    if (type === 'phone') validators.push(Validators.pattern('^[0-9+\\-() ]+$'));
    if (pattern) validators.push(Validators.pattern(pattern));

    let initialValue = this.getInitialValue(name);

    const newControl = new FormControl(initialValue, validators);

    if (name.includes('.')) {
      const parts = name.split('.');
      let currentGroup: FormGroup = this.form;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!currentGroup.get(parts[i])) {
          currentGroup.addControl(parts[i], new FormGroup({}));
        }
        currentGroup = currentGroup.get(parts[i]) as FormGroup;
      }
      currentGroup.addControl(parts[parts.length - 1], newControl);
    } else {
      this.form.addControl(name, newControl);
    }
  }

  getInitialValue(name: string): any {
    if (!this.initialData) return '';
    return name.split('.').reduce((acc, part) => acc && acc[part], this.initialData) || '';
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
    } else {
      this.form.markAllAsTouched();
    }
  }

  shouldDisplay(field: FormField): boolean {
    if (field.conditionalDisplay) {
      return field.conditionalDisplay(this.form.value);
    }
    return true;
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
