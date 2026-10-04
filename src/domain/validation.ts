import type { ClassErrors, ClassInput, SchoolInput } from "./types";

export function validateSchool(input: SchoolInput): SchoolInput {
  const errors: SchoolInput = {
    name: "",
    address: "",
  };

  if (!input.name.trim()) errors.name = "Informe o nome da escola.";
  if (!input.address.trim()) errors.address = "Informe o endereço da escola.";

  return errors;
}

export function validateClass(input: ClassInput): ClassErrors {
  const errors: ClassErrors = {
    name: "",
    schoolYear: "",
    shift: "",
  };

  if (!input.name.trim()) errors.name = "Informe o nome da turma.";
  if (
    !Number.isInteger(input.schoolYear) ||
    input.schoolYear < 2000 ||
    input.schoolYear > 2100
  ) {
    errors.schoolYear = "Informe um ano letivo válido.";
  }

  return errors;
}
