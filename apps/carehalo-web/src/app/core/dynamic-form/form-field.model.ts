export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'date' | 'phone';
  required?: boolean;
  options?: { value: string; label: string }[];
  conditionalDisplay?: (formValue: any) => boolean;
  pattern?: string;
  gridColumn?: string; // e.g., 'span 6'
}
