import type { Shift } from "../domain/types";

export const SCHOOL_STORAGE_KEY = "@gestao-escolar/v1";

export const SHIFTS: Shift[] = ["Manhã", "Tarde", "Noite", "Integral"];

export const ALL_SHIFTS = "Todas" as const;
