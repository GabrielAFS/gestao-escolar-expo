import { validateClass, validateSchool } from "../../domain/validation";

describe("validateSchool", () => {
  it("requires school name and address", () => {
    expect(validateSchool({ name: "", address: "" })).toEqual({
      name: "Informe o nome da escola.",
      address: "Informe o endereço da escola.",
    });
  });

  it("accepts a valid school", () => {
    expect(
      validateSchool({ name: "Escola Central", address: "Rua A, 10" }),
    ).toEqual({ name: "", address: "" });
  });
});

describe("validateClass", () => {
  it("requires a name and valid school year", () => {
    expect(
      validateClass({ name: "", shift: "Manhã", schoolYear: 1999 }),
    ).toEqual({
      name: "Informe o nome da turma.",
      schoolYear: "Informe um ano letivo válido.",
      shift: "",
    });
  });

  it("accepts a valid class", () => {
    expect(
      validateClass({ name: "1º Ano A", shift: "Manhã", schoolYear: 2026 }),
    ).toEqual({ name: "", schoolYear: "", shift: "" });
  });
});
