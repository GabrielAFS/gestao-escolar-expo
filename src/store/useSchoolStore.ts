import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import type { ClassInput, School, SchoolInput, SchoolClass } from '../domain/types';
import { schoolApi } from '../services/api';
import { seedSchools } from '../mocks/seed';

const STORAGE_KEY = '@gestao-escolar/v1';
interface SchoolState {
  schools: School[];
  hydrated: boolean;
  loading: boolean;
  hydrate: () => Promise<void>;
  refresh: () => Promise<void>;
  saveSchool: (input: SchoolInput, schoolId?: string) => Promise<void>;
  removeSchool: (schoolId: string) => Promise<void>;
  saveClass: (schoolId: string, input: ClassInput, classId?: string) => Promise<void>;
  removeClass: (classId: string) => Promise<void>;
}
const persist = async (schools: School[]) => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schools));

export const useSchoolStore = create<SchoolState>((set, get) => ({
  schools: seedSchools, hydrated: false, loading: false,
  hydrate: async () => {
    if (get().hydrated) return;
    set({ loading: true });
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as School[];
        schoolApi.replaceDatabase(saved);
        set({ schools: saved });
      } else {
        const initial = await schoolApi.listSchools();
        await persist(initial);
        set({ schools: initial });
      }
    } catch {
      set({ schools: await schoolApi.listSchools() });
    } finally { set({ hydrated: true, loading: false }); }
  },
  refresh: async () => {
    set({ loading: true });
    try { set({ schools: await schoolApi.listSchools() }); }
    finally { set({ loading: false }); }
  },
  saveSchool: async (input, schoolId) => {
    if (schoolId) await schoolApi.updateSchool(schoolId, input);
    else await schoolApi.createSchool(input);
    const schools = await schoolApi.listSchools();
    set({ schools }); await persist(schools);
  },
  removeSchool: async (schoolId) => {
    await schoolApi.deleteSchool(schoolId);
    const schools = await schoolApi.listSchools();
    set({ schools }); await persist(schools);
  },
  saveClass: async (schoolId, input, classId) => {
    if (classId) await schoolApi.updateClass(classId, input);
    else await schoolApi.createClass(schoolId, input);
    const schools = await schoolApi.listSchools();
    set({ schools }); await persist(schools);
  },
  removeClass: async (classId) => {
    await schoolApi.deleteClass(classId);
    const schools = await schoolApi.listSchools();
    set({ schools }); await persist(schools);
  }
}));