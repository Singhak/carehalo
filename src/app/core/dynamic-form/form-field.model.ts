export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'date';
  options?: { value: string; label: string }[];
  required?: boolean;
  conditionalDisplay?: (formValue: any) => boolean;
}
