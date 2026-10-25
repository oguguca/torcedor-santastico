/**
 * Créditos das fotos de licença livre usadas na landing page (Wikimedia Commons).
 * Todas foram convertidas para preto e branco; as da torcida também foram
 * recortadas para remover a marca d'água do rodapé.
 */

export type PhotoCredit = {
  subject: string;
  author: string;
  license: string;
  source: string;
};

export const photoCredits: PhotoCredit[] = [
  {
    subject: "Torcida do Santos na Vila Belmiro",
    author: "Douglas Teixeira (futebolsantista.com.br)",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Torcida_do_Santos_na_Vila_Belmiro_(44726853001).jpg",
  },
  {
    subject: "Torcida do Santos na Vila Belmiro",
    author: "Douglas Teixeira (futebolsantista.com.br)",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Torcida_do_Santos_na_Vila_Belmiro_(44677813632).jpg",
  },
  {
    subject: "Pelé em Mar del Plata, 1965",
    author: "Autor desconhecido",
    license: "Domínio público",
    source: "https://commons.wikimedia.org/wiki/File:Pel%C3%A9_Mar_del_Plata_1965.PNG",
  },
];
