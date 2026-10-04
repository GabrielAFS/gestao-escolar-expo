import type { School } from "../domain/types";

export const seedSchools: School[] = [
  {
    id: "school-1",
    name: "Escola Municipal Maria Firmina",
    address: "Rua das Flores, 120 — Centro",
    createdAt: "2026-01-10T12:00:00.000Z",
    classes: [
      {
        id: "class-1",
        schoolId: "school-1",
        name: "1º Ano A",
        shift: "Manhã",
        schoolYear: 2026,
        createdAt: "2026-01-10T12:00:00.000Z",
      },
      {
        id: "class-2",
        schoolId: "school-1",
        name: "5º Ano B",
        shift: "Tarde",
        schoolYear: 2026,
        createdAt: "2026-01-11T12:00:00.000Z",
      },
    ],
  },
  {
    id: "school-2",
    name: "Escola Municipal José de Alencar",
    address: "Av. da Educação, 450 — São José",
    createdAt: "2026-02-03T12:00:00.000Z",
    classes: [
      {
        id: "class-3",
        schoolId: "school-2",
        name: "3º Ano A",
        shift: "Integral",
        schoolYear: 2026,
        createdAt: "2026-02-03T12:00:00.000Z",
      },
    ],
  },
  {
    id: "school-3",
    name: "Centro Educacional Caminhos",
    address: "Praça da Matriz, 18 — Novo Horizonte",
    createdAt: "2026-02-18T12:00:00.000Z",
    classes: [],
  },
];
