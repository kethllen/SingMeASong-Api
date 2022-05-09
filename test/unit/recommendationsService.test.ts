import { recommendationService } from '../../src/services/recommendationsService.js';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import {createRecommendation} from "../factories/recommendationBodyFactory.js";
import { createManyRecommendation } from '../factories/recommendationsBodyManyFactory.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { prisma } from "../../src/database.js";
import { createRecommendationData } from '../factories/recommendationDataFactory.js';

async function disconnect(){
  await prisma.$disconnect();
}
async function truncateRecommendations(){
 await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;

}

describe('unit - test /RecommendationService', () => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  jest.clearAllMocks();
  jest.resetAllMocks();
  it('should conflict create recommendation is found', async () => {
    const body= createRecommendationData();
    const body2 = {name: body.name, youtubeLink: body.youtubeLink, score: body.score}
    await recommendationService.insert(body2);

    jest.spyOn(recommendationRepository, "findByName").mockResolvedValue({ ...body });
    jest.spyOn(recommendationRepository, 'create').mockResolvedValue();
    expect(async () => {
      await recommendationService.insert(body2);
    }).rejects.toEqual({ message: 'Recommendations names must be unique', type: 'conflict' });

	  });


    it('should valid  create recommendation is found', async () => {
      const body= createRecommendation();
  
     jest.spyOn(recommendationRepository, "findByName").mockResolvedValue(null);
  
     
      const insertRepository=jest.spyOn(recommendationRepository, "create").mockResolvedValue(null);
      
      await recommendationService.insert(body);

      expect( insertRepository).toBeCalledTimes(1);
      expect( insertRepository).toBeCalledWith(body);
    });
  });
  describe('unit - test /RecommendationService/upvote', () => {
    beforeEach(truncateRecommendations);

  afterAll(disconnect);
  jest.clearAllMocks();
  jest.resetAllMocks();
    it('should not found recommendation upvote', async () => {

      jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);
  
      expect(async () => {
        await recommendationService.upvote(1);
      }).rejects.toEqual({ message: '', type: 'not_found' });
    });
  });
  describe('unit - test /RecommendationService/downvote ', () => {
    beforeEach(truncateRecommendations);

  afterAll(disconnect);
  jest.clearAllMocks();
  jest.resetAllMocks();
    it('should not found ', async () => {
      jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);
  
      expect(async () => {
        await recommendationService.downvote(1);
      }).rejects.toEqual({ message: '', type: 'not_found' });
    });
  });

  describe('unit - test /RecommendationService/downvote', () => {
    beforeEach(truncateRecommendations);

  afterAll(disconnect);
  jest.clearAllMocks();
  jest.resetAllMocks();
    it('should remove', async () => {

    const recommendation = createRecommendationData();
      jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);

      const downvoteRepository = jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({ ...recommendation, score: -6 });
      
      const remove = jest
      .spyOn(recommendationRepository, 'remove')
      .mockResolvedValue(null);
  
      await recommendationService.downvote(1);
  
      expect(remove).toHaveBeenCalledTimes(1);
    });
   
  });
  describe('unit - test /RecommendationService/upvote', () => {
    beforeEach(truncateRecommendations);

  afterAll(disconnect);
  jest.clearAllMocks();
  jest.resetAllMocks();
      it('should valid recommendation upvote', async () => {

        const recommendation = {
          id: 1,
          name: faker.name.findName(),
          youtubeLink: faker.internet.url(),
          score: 10
        };
          jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);
    
          const upvoteRepository  =jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({ ...recommendation, score: 11 });
          
      
          await recommendationService.upvote(1);
      
          expect(upvoteRepository).toBeCalledWith(1, "increment");
        });
  });
  describe('unit - test /RecommendationService/getRandom', () => {
    beforeEach(truncateRecommendations);

  afterAll(disconnect);

	     it('should not found recommendation getRandom', async () => {
            const random = 0.8;

            jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValue('lte');
            jest.spyOn(recommendationService, 'getByScore').mockResolvedValue([]);
            jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);

            expect(async () => {
              await recommendationService.getRandom();
            }).rejects.toEqual({ message: '', type: 'not_found' });
          });
    });

    describe('unit - test /RecommendationService/getByScore', () => {
      beforeEach(truncateRecommendations);

  afterAll(disconnect);
  jest.clearAllMocks();
  jest.resetAllMocks();
      it('should return recommendations', async () => {
        const recommendation = createRecommendationData();

        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([recommendation]);
    
        const result = await recommendationService.getByScore('gt');
    
        expect(result).toEqual([]);
      });
    
    });
    // describe('unit - test /RecommendationService/getScoreFilter', () => {
    //   beforeEach(truncateRecommendations);

    //   afterAll(disconnect);
    //   jest.clearAllMocks();
    //   jest.resetAllMocks();
    //   it('should return lte if value is higher than 0.7', async () => {
    //     const result = recommendationService.getScoreFilter(0.8);
    
    //     expect(result).toBe('lte');
    //   });
    
    //   it('should return gt if value is lower than 0.7', async () => {
    //     const result = recommendationService.getScoreFilter(0.6);
    
    //     expect(result).toBe('gt');
    //   });
    // });

 

