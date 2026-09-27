export interface SelectFieldOption<T = string> {
  label: string;
  value: T;
}

export type FormFieldErrorMessages = Readonly<Record<string, string>>;