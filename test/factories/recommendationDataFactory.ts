import { faker } from '@faker-js/faker';


export function createRecommendationData () {
  const recommendationBody = {
    id:1,
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM",
    score:-5,
  };


  return recommendationBody;
} 
