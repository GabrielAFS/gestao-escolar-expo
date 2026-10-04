import type { ClassInput, SchoolInput } from './types';

export function validateSchool(input: SchoolInput): string | null {
  if (!input.name.trim()) return 'Informe o nome da escola.';
  if (!input.address.trim()) return 'Informe o endereço da escola.';
  return null;
}

export function validateClass(input: ClassInput): string | null {
  if (!input.name.trim()) return 'Informe o nome da turma.';
  if (!Number.isInteger(input.schoolYear) || input.schoolYear < 2000 || input.schoolYear > 2100) {
    return 'Informe um ano letivo válido.';
  }
  return null;
}
