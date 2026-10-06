import { useEffect, useState } from "react";
import type { School, SchoolInput } from "../../../domain/types";
import { validateSchool } from "../../../domain/validation";
import { useSchoolStore } from "../../../store/useSchoolStore";

const INITIAL_ERRORS = { name: "", address: "" };

export function useSchoolForm(school?: School) {
  const saveSchool = useSchoolStore((state) => state.saveSchool);
  const [name, setName] = useState(school?.name ?? "");
  const [address, setAddress] = useState(school?.address ?? "");
  const [error, setError] = useState(INITIAL_ERRORS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (school) {
      // The persisted school can be hydrated after the initial render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(school.name);
      setAddress(school.address);
    }
  }, [school]);


  const submit = async (schoolId?: string): Promise<boolean> => {
    const input: SchoolInput = { name, address };
    const errors = validateSchool(input);

    if (errors.name || errors.address) {
      setError(errors);
      return false;
    }

    setSaving(true);
    setError(INITIAL_ERRORS);

    try {
      await saveSchool(input, schoolId);
      return true;
    } finally {
      setSaving(false);
    }
  };

  return {
    name,
    setName,
    address,
    setAddress,
    error,
    saving,
    submit,
  };
}
