/**
 * Elenco do Santos em 2026, como listado no ogol.com.br em 25/10/2026.
 * Os números de camisa ficaram de fora: a fonte repete números entre
 * jogadores e diverge de outras fontes. Atualize à mão até a Etapa 4.
 */

export type SquadGroup = {
  label: string;
  players: string[];
};

export const santosSquad = {
  source: { label: "ogol.com.br", url: "https://www.ogol.com.br/equipe/santos" },
  checkedAt: "25/10/2026",
  groups: [
    {
      label: "Goleiros",
      players: ["Arthur Vale", "Diógenes", "Gabriel Brazão", "João Paulo", "João Pedro", "Rodrigo Falcão"],
    },
    {
      label: "Defensores",
      players: [
        "Adonis Frías",
        "Alexis Duarte",
        "Gabriel Follmer",
        "Gonzalo Escobar",
        "Igor Vinícius",
        "João Alencar",
        "João Ananias",
        "João Basso",
        "JP Chermont",
        "Lucas Veríssimo",
        "Luan Peres",
        "Mayke",
        "Rafael Gonzaga",
        "Rodinei",
        "Vinicius Lira",
        "Zé Ivaldo",
      ],
    },
    {
      label: "Meias",
      players: [
        "Arthur Melo",
        "Christian Oliva",
        "Gabriel Bontempo",
        "Gabriel Menino",
        "Gustavo Henrique",
        "João Schmidt",
        "Kauan Pierry",
        "Kenay Martins",
        "Lima",
        "Miguelito",
        "Nicola Profeta",
        "Pepê Fermino",
        "Philippe Coutinho",
        "Samuel Pierri",
        "Thaciano",
        "Tomás Rincón",
        "Vinícius Rocha",
        "Vinicius Fabri",
        "Willian Arão",
        "Zé Rafael",
      ],
    },
    {
      label: "Atacantes",
      players: [
        "Álvaro Barreal",
        "Benjamín Rollheiser",
        "Billal Brahimi",
        "David Nogueira",
        "Davi Fernandes",
        "Everton Cebolinha",
        "Gabriel Barbosa",
        "Gustavo Caballero",
        "João Alves",
        "Kaio Ganga",
        "Lautaro Díaz",
        "Mateus Xavier",
        "Moisés",
        "Nadson",
        "Neymar",
        "Pedro Assis",
        "Pradella",
        "Rafael Freitas",
        "Robinho Jr.",
        "Rony",
      ],
    },
  ] satisfies SquadGroup[],
};
