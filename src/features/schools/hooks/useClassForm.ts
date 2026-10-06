import { useState } from "react";
import type { ClassErrors, School, Shift } from "../../../domain/types";
import { validateClass } from "../../../domain/validation";
import { useSchoolStore } from "../../../store/useSchoolStore";

const INITIAL_ERRORS: ClassErrors = {
  name: "",
  schoolYear: "",
  shift: "",
};

export function useClassForm(school?: School, classId?: string) {
  const existing = school?.classes.find((item) => item.id === classId);
  const saveClass = useSchoolStore((state) => state.saveClass);
  const [name, setName] = useState(existing?.name ?? "");
  const [shift, setShift] = useState<Shift>(existing?.shift ?? "Manhã");
  const [year, setYear] = useState(
    String(existing?.schoolYear ?? new Date().getFullYear()),
  );
  const [error, setError] = useState<ClassErrors>(INITIAL_ERRORS);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (): Promise<boolean> => {
    const input = { name, shift, schoolYear: Number(year) };
    const errors = validateClass(input);

    if (errors.name || errors.schoolYear || errors.shift) {
      setError(errors);
      return false;
    }

    if (!school) {
      setGlobalError("Escola não encontrada.");
      return false;
    }

    setSaving(true);
    setError(INITIAL_ERRORS);
    setGlobalError(null);

    try {
      await saveClass(school.id, input, classId);
      return true;
    } finally {
      setSaving(false);
    }
  };

  return {
    name,
    setName,
    shift,
    setShift,
    year,
    setYear,
    error,
    globalError,
    saving,
    submit,
  };
}
