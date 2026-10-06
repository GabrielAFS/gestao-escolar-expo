/**
 * Contrato HTTP equivalente do mock. Em web/testes, MSW pode interceptar estas rotas.
 * O app nativo usa schoolApi para evitar depender de interceptação de rede no Expo Go.
 */
import { http, HttpResponse } from "msw";
import { seedSchools } from "./seed";
import { SchoolInput } from "@/domain/types";

let schools = structuredClone(seedSchools);
export const handlers = [
  http.get("/schools", () => HttpResponse.json(schools)),
  http.post("/schools", async ({ request }) => {
    const body = (await request.json()) as SchoolInput;
    const school = {
      id: `school-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      classes: [],
    };
    schools = [school, ...schools];
    return HttpResponse.json(school, { status: 201 });
  }),
  http.get("/schools/:schoolId/classes", ({ params }) => {
    const school = schools.find((item) => item.id === String(params.schoolId));
    return school
      ? HttpResponse.json(school.classes)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
  http.get("/classes", () =>
    HttpResponse.json(schools.flatMap((school) => school.classes)),
  ),
];
