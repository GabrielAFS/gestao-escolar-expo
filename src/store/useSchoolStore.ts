import { create } from "zustand";
import type { ClassInput, School, SchoolInput } from "../domain/types";
import { schoolApi } from "../services/api";
import { loadSchools, saveSchools } from "../services/storage";
import { seedSchools } from "../mocks/seed";

interface SchoolState {
  schools: School[];
  hydrated: boolean;
  loading: boolean;
  hydrate: () => Promise<void>;
  refresh: () => Promise<void>;
  saveSchool: (input: SchoolInput, schoolId?: string) => Promise<void>;
  removeSchool: (schoolId: string) => Promise<void>;
  saveClass: (
    schoolId: string,
    input: ClassInput,
    classId?: string,
  ) => Promise<void>;
  removeClass: (classId: string) => Promise<void>;
}

async function refreshSchools(set: (state: Partial<SchoolState>) => void) {
  const schools = await schoolApi.listSchools();
  set({ schools });
  await saveSchools(schools);
}

export const useSchoolStore = create<SchoolState>((set, get) => ({
  schools: seedSchools,
  hydrated: false,
  loading: false,
  hydrate: async () => {
    if (get().hydrated) return;

    set({ loading: true });
    try {
      const saved = await loadSchools();
      if (saved) {
        schoolApi.replaceDatabase(saved);
        set({ schools: saved });
      } else {
        const initial = await schoolApi.listSchools();
        await saveSchools(initial);
        set({ schools: initial });
      }
    } catch {
      set({ schools: await schoolApi.listSchools() });
    } finally {
      set({ hydrated: true, loading: false });
    }
  },
  refresh: async () => {
    set({ loading: true });
    try {
      await refreshSchools(set);
    } finally {
      set({ loading: false });
    }
  },
  saveSchool: async (input, schoolId) => {
    if (schoolId) await schoolApi.updateSchool(schoolId, input);
    else await schoolApi.createSchool(input);
    await refreshSchools(set);
  },
  removeSchool: async (schoolId) => {
    await schoolApi.deleteSchool(schoolId);
    await refreshSchools(set);
  },
  saveClass: async (schoolId, input, classId) => {
    if (classId) await schoolApi.updateClass(classId, input);
    else await schoolApi.createClass(schoolId, input);
    await refreshSchools(set);
  },
  removeClass: async (classId) => {
    await schoolApi.deleteClass(classId);
    await refreshSchools(set);
  },
}));
