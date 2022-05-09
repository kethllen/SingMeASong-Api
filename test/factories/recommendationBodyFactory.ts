import { faker } from '@faker-js/faker';
import { recommendationSchema } from '../../src/schemas/recommendationsSchemas';

export function createRecommendation () {
  const recommendationBody = {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=LU2DgybGXfM"
  };
  const recommendation  = recommendationSchema.validate(recommendationBody);


  return recommendationBody;
} 
