import { schoolApi } from "../../services/api";

describe("schoolApi", () => {
  it("creates and reads a school", async () => {
    const before = await schoolApi.listSchools();
    const created = await schoolApi.createSchool({
      name: "Escola de Teste",
      address: "Rua de Teste, 10",
    });
    const after = await schoolApi.getSchool(created.id);

    expect(after).toEqual(created);
    expect(after?.name).toBe("Escola de Teste");
    expect((await schoolApi.listSchools()).length).toBe(before.length + 1);

    await schoolApi.deleteSchool(created.id);
  });

  it("creates, updates and deletes a class", async () => {
    const schools = await schoolApi.listSchools();
    const school = schools[0];
    const created = await schoolApi.createClass(school.id, {
      name: "Turma de Teste",
      shift: "Noite",
      schoolYear: 2026,
    });

    const updated = await schoolApi.updateClass(created.id, {
      name: "Turma Atualizada",
      shift: "Integral",
      schoolYear: 2027,
    });

    expect(updated.name).toBe("Turma Atualizada");
    expect(updated.shift).toBe("Integral");

    await schoolApi.deleteClass(created.id);
    expect(await schoolApi.listClasses(school.id)).not.toContainEqual(updated);
  });
});
