export type Shift = "Manhã" | "Tarde" | "Noite" | "Integral";

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  shift: Shift;
  schoolYear: number;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  classes: SchoolClass[];
}

export type SchoolInput = Pick<School, "name" | "address">;
export type ClassInput = Pick<SchoolClass, "name" | "shift" | "schoolYear">;
