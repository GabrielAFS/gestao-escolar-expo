import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCHOOL_STORAGE_KEY } from "../constants/school";
import type { School } from "../domain/types";

export async function loadSchools(): Promise<School[] | undefined> {
  const raw = await AsyncStorage.getItem(SCHOOL_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as School[]) : undefined;
}

export function saveSchools(schools: School[]): Promise<void> {
  return AsyncStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(schools));
}
