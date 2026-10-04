import type { ClassInput, School, SchoolClass, SchoolInput } from '../domain/types';
import { seedSchools } from '../mocks/seed';

const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 120));
let database: School[] = structuredClone(seedSchools);
const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** Implementação local dos endpoints REST, compatível com execução offline no Expo. */
export const schoolApi = {
  async listSchools(): Promise<School[]> {
    await wait();
    return structuredClone(database);
  },
  async getSchool(schoolId: string): Promise<School | undefined> {
    await wait();
    const school = database.find((item) => item.id === schoolId);
    return school ? structuredClone(school) : undefined;
  },
  async createSchool(input: SchoolInput): Promise<School> {
    await wait();
    const school: School = { id: id(), name: input.name.trim(), address: input.address.trim(), createdAt: new Date().toISOString(), classes: [] };
    database = [school, ...database];
    return structuredClone(school);
  },
  async updateSchool(schoolId: string, input: SchoolInput): Promise<School> {
    await wait();
    const index = database.findIndex((item) => item.id === schoolId);
    if (index < 0) throw new Error('Escola não encontrada.');
    database[index] = { ...database[index], name: input.name.trim(), address: input.address.trim() };
    return structuredClone(database[index]);
  },
  async deleteSchool(schoolId: string): Promise<void> {
    await wait();
    database = database.filter((item) => item.id !== schoolId);
  },
  async listClasses(schoolId: string): Promise<SchoolClass[]> {
    await wait();
    return structuredClone(database.find((school) => school.id === schoolId)?.classes ?? []);
  },
  async createClass(schoolId: string, input: ClassInput): Promise<SchoolClass> {
    await wait();
    const school = database.find((item) => item.id === schoolId);
    if (!school) throw new Error('Escola não encontrada.');
    const schoolClass: SchoolClass = { ...input, id: id(), schoolId, name: input.name.trim(), createdAt: new Date().toISOString() };
    school.classes = [...school.classes, schoolClass];
    return structuredClone(schoolClass);
  },
  async updateClass(classId: string, input: ClassInput): Promise<SchoolClass> {
    await wait();
    for (const school of database) {
      const index = school.classes.findIndex((item) => item.id === classId);
      if (index >= 0) {
        school.classes[index] = { ...school.classes[index], ...input, name: input.name.trim() };
        return structuredClone(school.classes[index]);
      }
    }
    throw new Error('Turma não encontrada.');
  },
  async deleteClass(classId: string): Promise<void> {
    await wait();
    database = database.map((school) => ({ ...school, classes: school.classes.filter((item) => item.id !== classId) }));
  },
  /** Usado pela hidratação offline para restaurar os dados persistidos. */
  replaceDatabase(schools: School[]) { database = structuredClone(schools); }
};
