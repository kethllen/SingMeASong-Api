import { faker } from '@faker-js/faker';


export function createManyRecommendation () {

  const recomendations =[

    {
      name: "Caso indefinido",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: 10,
    },
    {
      name: "No dia que eu sai de casa",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: 11,
    },
    {
      name: "Joga de ladinho",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: -5,
    },
    {
      name: "Um bom malandro",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: -5,
    },
    {
      name: "tem nada haver",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: faker.datatype.number(1000),
    },
    {
      name: "Mundo bita",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: faker.datatype.number(1000),
    },
    {
      name: "Galinha pintadinha",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: faker.datatype.number(1000),
    },
    {
      name: "Cleo e cuquim",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: faker.datatype.number(1000),
    },
    {
      name: "Bento e toto",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: faker.datatype.number(1000),
    },
    {
      name: "Cartoon banana",
      youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
      score: faker.datatype.number(1000),
    }
  ];


    return recomendations;
} 

