import { recommendationService } from '../../src/services/recommendationsService.js';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import {createRecommendation} from "../factories/recommendationBodyFactory.js";
import { createManyRecommendation } from '../factories/recommendationsBodyManyFactory.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { prisma } from "../../src/database.js";

async function disconnect(){
  await prisma.$disconnect();
}
async function truncateRecommendations(){
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}


describe('unit - test /RecommendationService', () => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it('should conflict create recommendation is found', async () => {
    const body= createManyRecommendation();

    await recommendationService.insert(body[0]);

    //jest.spyOn(recommendationRepository, "findByName").mockResolvedValue(body[0]);

    expect(async () => {
			await recommendationService.insert(body[0]);
		}).rejects.toEqual({ message: 'Recommendations names must be unique', type: 'conflict' });

	  });


    it('should valid  create recommendation is found', async () => {
      const body = createRecommendation();
  
    //  jest.spyOn(recommendationRepository, "findByName").mockResolvedValue(body.name);
  
     
      const insertRepository=jest.spyOn(recommendationRepository, "create").mockResolvedValue(null);
      
      await recommendationService.insert(body);

      expect( insertRepository).toBeCalledTimes(1);
      expect( insertRepository).toBeCalledWith(body);
    });

    it('should not found recommendation upvote', async () => {

      jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);
  
      expect(async () => {
        await recommendationService.upvote(1);
      }).rejects.toEqual({ message: '', type: 'not_found' });
    });
  
    it('should not found recommendation downvote', async () => {
      jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);
  
      expect(async () => {
        await recommendationService.downvote(1);
      }).rejects.toEqual({ message: '', type: 'not_found' });
    });

    it('should remove recommendation downvote', async () => {

    const recommendation = {
      id: 1,
      name: faker.name.findName(),
      youtubeLink: faker.internet.url(),
      score: -5
    };
      jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);

      const downvoteRepository =jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({ ...recommendation, score: -6 });
      
      const remove = jest
      .spyOn(recommendationRepository, 'remove')
      .mockResolvedValue(null);
  
      await recommendationService.downvote(1);
  
      expect(remove).toHaveBeenCalledTimes(1);
    });
    it('should recommendation downvote', async () => {

      const recommendation = {
        id: 1,
        name: faker.name.findName(),
        youtubeLink: faker.internet.url(),
        score: 10
      };
        jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);
  
        const downvoteRepository =jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({ ...recommendation, score: 9 });
        
        const remove = jest.spyOn(recommendationRepository, 'remove').mockResolvedValue(null);
    
        await recommendationService.downvote(1);
    
        expect(downvoteRepository).toBeCalledWith(1, 'decrement');
        expect(remove).toBeCalledTimes(0);
      });
      
      it('should recommendation upvote', async () => {

        const recommendation = {
          id: 1,
          name: faker.name.findName(),
          youtubeLink: faker.internet.url(),
          score: 10
        };
          jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);
    
          const upvoteRepository  =jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({ ...recommendation, score: 11 });
          
      
          await recommendationService.downvote(1);
      
          expect(upvoteRepository).toBeCalledWith(1, "increment");
          expect(upvoteRepository).toBeCalledTimes(1);
        });
      
        
	      it('should not found recommendation getRandom', async () => {
            const random = 0.8;

            jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValue('lte');
            jest.spyOn(recommendationService, 'getByScore').mockResolvedValue([]);
            jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);

            expect(async () => {
              await recommendationService.getRandom();
            }).rejects.toEqual({ message: '', type: 'not_found' });
          });
          it('should recommendation getRandom', async () => {
            const random = 0.2;
        
            const recommendations = createManyRecommendation();

            await prisma.recommendation.createMany({
              data: [ { ...recommendations[0]}, { ...recommendations[1] }, { ...recommendations[2] }, { ...recommendations[3] },{ ...recommendations[4] },{ ...recommendations[5] }, { ...recommendations[6] }, { ...recommendations[7] }, { ...recommendations[8] }, { ...recommendations[9] }]
            });
        
            jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValueOnce('gt');
            jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);
        
            await recommendationService.getRandom();
        
            expect(recommendationRepository.findAll).toBeCalledTimes(1);
          });
        it('should return lte if value is higher than 0.7 getScoreFilter', async () => {
            const result = recommendationService.getScoreFilter(0.8);
        
            expect(result).toBe('lte');
          });
        
        it('should return gt if value is lower than 0.7 getScoreFilter', async () => {
          const result = recommendationService.getScoreFilter(0.6);
        
          expect(result).toBe('gt');
      });

        it('should findAll if filtered return no recommendations getByScore', async () => {
          jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);
      
          const result = jest
            .spyOn(recommendationRepository, 'findAll')
            .mockResolvedValue([]);
      
          await recommendationService.getByScore('gt');
      
          expect(result).toHaveBeenCalledTimes(2);
        });
      
      it('should findAll filtered with valid scoreFilter GT getByScore', async () => {
          const result = jest
            .spyOn(recommendationRepository, 'findAll');
      
          await recommendationService.getByScore('gt');
      
          expect(result).toBeCalledWith({ score: 10, scoreFilter: 'gt' });
        });
      

        it('should findAll filtered with valid scoreFilter lte getByScore', async () => {
          const result = jest
            .spyOn(recommendationRepository, 'findAll');
      
          await recommendationService.getByScore('lte');
      
          expect(result).toBeCalledWith({ score: 10, scoreFilter: 'lte' });
        });

  });

