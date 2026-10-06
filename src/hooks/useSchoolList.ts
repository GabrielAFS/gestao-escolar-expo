import { useMemo, useState } from "react";
import type { School } from "../domain/types";
import { filterSchools } from "../utils/school";

export function useSchoolList(schools: School[]) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterSchools(schools, query), [schools, query]);

  return { query, setQuery, filtered };
}
