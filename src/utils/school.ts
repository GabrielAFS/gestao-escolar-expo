import type { School, SchoolClass, Shift } from "../domain/types";

export function filterSchools(schools: School[], query: string): School[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return schools;

  return schools.filter((school) =>
    `${school.name} ${school.address}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export function filterClasses(
  classes: SchoolClass[],
  shift: Shift | "Todas",
): SchoolClass[] {
  return classes.filter((item) => shift === "Todas" || item.shift === shift);
}

export function countSchoolClasses(schools: School[]): number {
  return schools.reduce((sum, school) => sum + school.classes.length, 0);
}

export function countSchoolYears(classes: SchoolClass[]): number {
  return new Set(classes.map((item) => item.schoolYear)).size;
}
