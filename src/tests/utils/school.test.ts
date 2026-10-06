import { filterClasses, filterSchools } from "../../utils/school";
import type { School, SchoolClass } from "../../domain/types";

const schools: School[] = [
  {
    id: "1",
    name: "Escola Central",
    address: "Rua A",
    createdAt: "2026-01-01T00:00:00.000Z",
    classes: [],
  },
  {
    id: "2",
    name: "Escola Norte",
    address: "Rua B",
    createdAt: "2026-01-01T00:00:00.000Z",
    classes: [],
  },
];

const classes: SchoolClass[] = [
  {
    id: "1",
    schoolId: "1",
    name: "1º Ano A",
    shift: "Manhã",
    schoolYear: 2026,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    schoolId: "1",
    name: "2º Ano A",
    shift: "Tarde",
    schoolYear: 2026,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

describe("school utils", () => {
  it("filters schools by name or address", () => {
    expect(filterSchools(schools, "central")).toHaveLength(1);
    expect(filterSchools(schools, "Rua B")[0].id).toBe("2");
  });

  it("returns all schools for an empty query", () => {
    expect(filterSchools(schools, " ")).toEqual(schools);
  });

  it("filters classes by shift", () => {
    expect(filterClasses(classes, "Manhã")).toHaveLength(1);
    expect(filterClasses(classes, "Todas")).toHaveLength(2);
  });
});
