import { validateClass, validateSchool } from "../validation";

describe("validação de escola", () => {
  it("exige nome e endereço", () => {
    expect(validateSchool({ name: "", address: "" })).toBe({
      name: "Informe o nome da escola.",
      address: "Informe o endereço da escola.",
    });
    expect(validateSchool({ name: "Escola", address: "" })).toBe({
      name: "",
      address: "Informe o endereço da escola.",
    });
    expect(validateSchool({ name: "Escola", address: "Rua A, 10" })).toBe({
      name: "",
      address: "",
    });
  });
});

describe("validação de turma", () => {
  it("valida nome e ano letivo", () => {
    expect(validateClass({ name: "", shift: "Manhã", schoolYear: 2026 })).toBe(
      "Informe o nome da turma."
    );
    expect(
      validateClass({ name: "1º A", shift: "Manhã", schoolYear: 1800 })
    ).toBe("Informe um ano letivo válido.");
    expect(
      validateClass({ name: "1º A", shift: "Manhã", schoolYear: 2026 })
    ).toBeNull();
  });
});
