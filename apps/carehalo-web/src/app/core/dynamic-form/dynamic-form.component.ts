import { ChangeDetectorRef, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
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
  @Input() submitButtonText: string = 'Submit';
  @Input() resetOnSubmit: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  showSuccess: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.formFields && this.formFields.length) {
      this.createForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formFields'] && !changes['formFields'].firstChange) {
      this.createForm();
    }

    if (changes['initialData'] && this.form && this.initialData) {
      this.form.patchValue(this.initialData);
      this.cdr.detectChanges();
    }
  }

  createForm() {
    this.form = this.fb.group({});
    this.formFields.forEach(field => {
        this.createControl(field);
    });

    if (this.initialData) {
        this.form.patchValue(this.initialData);
    }
  }

  createControl(field: FormField) {
    if (field.type === 'form-array') {
        const arrayData = this.getInitialValue(field.name) || [];
        const formArray = this.fb.array(arrayData.map((item: any) => this.createFormArrayGroup(field.arrayFields ?? [], item)));
        this.form.addControl(field.name, formArray);
    } else {
        const validators = this.getValidators(field);
        const initialValue = this.getInitialValue(field.name);
        const control = this.fb.control({ value: initialValue, disabled: field.disabled ?? false }, validators);

        if (field.name.includes('.')) {
            const parts = field.name.split('.');
            let currentGroup: FormGroup = this.form;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!currentGroup.get(parts[i])) {
                    currentGroup.addControl(parts[i], this.fb.group({}));
                }
                currentGroup = currentGroup.get(parts[i]) as FormGroup;
            }
            currentGroup.addControl(parts[parts.length - 1], control);
        } else {
            this.form.addControl(field.name, control);
        }
    }
  }

  createFormArrayGroup(fields: FormField[], data: any = {}): FormGroup {
    const group = this.fb.group({});
    fields.forEach(field => {
        const validators = this.getValidators(field);
        group.addControl(field.name, this.fb.control(data[field.name] || '', validators));
    });
    return group;
  }

  getValidators(field: FormField): any[] {
    const validators: any[] = [];
    if (field.required) validators.push(Validators.required);
    if (field.type === 'email') validators.push(Validators.email);
    if (field.type === 'phone') validators.push(Validators.pattern('^[0-9+\\-() ]+$'));
    if (field.pattern) validators.push(Validators.pattern(field.pattern));
    return validators;
  }

  addFormArrayGroup(arrayName: string, fields: FormField[]) {
    const formArray = this.form.get(arrayName) as FormArray;
    formArray.push(this.createFormArrayGroup(fields));
  }

  removeFormArrayGroup(arrayName: string, index: number) {
    const formArray = this.form.get(arrayName) as FormArray;
    formArray.removeAt(index);
  }

  getInitialValue(name: string): any {
    if (!this.initialData) return '';
    return name.split('.').reduce((acc, part) => acc && acc[part], this.initialData) || '';
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.getRawValue());
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

  getFormArray(name: string): FormArray {
    return this.form.get(name) as FormArray;
  }
}
