export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'date' | 'textarea' | 'phone';
  options?: { value: string; label: string }[];
  required?: boolean;
  pattern?: string; // optional regex pattern for validation
  conditionalDisplay?: (formValue: any) => boolean;
}
