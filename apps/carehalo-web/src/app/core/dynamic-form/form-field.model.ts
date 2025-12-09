export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'date' | 'select' | 'textarea' | 'form-array' | 'phone';
    required?: boolean;
    options?: { value: any; label: string }[];
    pattern?: string;
    gridColumn?: string;
    conditionalDisplay?: (formValue: any) => boolean;
    arrayFields?: FormField[];
    disabled?: boolean;
  }
  