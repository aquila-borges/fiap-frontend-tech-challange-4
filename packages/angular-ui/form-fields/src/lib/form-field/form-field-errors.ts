import { FormControl } from '@angular/forms';

import { FormFieldErrorMessages } from './form-field.models';

const defaultMessages: FormFieldErrorMessages = {
  required: 'Campo obrigatório.',
  min: 'O valor informado é menor que o permitido.',
  minlength: 'O texto informado é muito curto.',
};

export function getFormFieldError(
  control: FormControl,
  messages: FormFieldErrorMessages,
): string {
  const errorKey = Object.keys(control.errors ?? {})[0];
  return errorKey ? (messages[errorKey] ?? defaultMessages[errorKey] ?? 'Valor inválido.') : '';
}