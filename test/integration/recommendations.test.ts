import app from '../../src/app.js';
import supertest from 'supertest';
import {createRecommendation} from "../factories/recommendationBodyFactory.js";
import {createManyRecommendation} from "../factories/recommendationsBodyManyFactory";
import { prisma } from "../../src/database.js";
import { faker } from '@faker-js/faker';

async function disconnect(){
  await prisma.$disconnect();
}
async function truncateRecommendations(){
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
}

describe("POST /",() => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it("given a valid music insert should return 201", async ()=>{
    const body =  createRecommendation();

    const result = await supertest(app).post("/recommendations").send(body);
   
    const status = result.status;
    expect(status).toEqual(201);
});
it("should return 422 given an unnamed body", async () => {
	const body =  createRecommendation();

	const response = await supertest(app).post("/recommendations").send({
		youtubeLink: body.youtubeLink,
	});
	expect(response.status).toEqual(422);
});

it("should return 422 given a body with no youtubeLink", async () => {
	const body =  createRecommendation();

	const response = await supertest(app).post("/recommendations").send({
		name: body.name,
	});
	expect(response.status).toEqual(422);
});

it("should return 422 empty body", async () => {
	const body = {};

	const response = await supertest(app).post("/recommendations").send(body);
	expect(response.status).toEqual(422);
});
});

describe("GET /",() => {
    beforeEach(truncateRecommendations);
  
    afterAll(disconnect);
    it("given a valid music get should return 200", async ()=>{
      const recommendations = createManyRecommendation();

      await prisma.recommendation.createMany({
        data: recommendations
      });
      const result = await supertest(app).get("/recommendations");

      const status = result.status;

      expect(status).toEqual(200);
      expect(result.body.length).toBeGreaterThanOrEqual(10);
  });
});

describe("GET /random", () => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it("given a valid music get random should return 200", async ()=>{
    const recommendations = createManyRecommendation();

    await prisma.recommendation.createMany({
			data: recommendations
		});

    const result = await supertest(app).get("/recommendations/random");

    const status = result.status;

    expect(status).toEqual(200);
    
});
});

describe("GET /top/:amount",() => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it("given a valid music get top amount should return 200", async ()=>{
    const recommendations = createManyRecommendation();

    await prisma.recommendation.createMany({
			data: recommendations
		});
    
    const amount = faker.datatype.number({ min: 2, max: 5 });

    const result  = await supertest(app).get(`/recommendations/top/${amount}`);

    const status = result.status;
    expect(status).toEqual(200);
    expect(result.body.length).toBe(amount);
    expect(result.body[0].score).toBeGreaterThanOrEqual(result.body[1].score);
});
});

describe("GET /:id", () => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it("given a valid music get by id should return 200", async ()=>{
    const recommendations = createManyRecommendation();

       await prisma.recommendation.createMany({
			data: recommendations
		});
			const test = await prisma.recommendation.findMany();
		
    const id = faker.datatype.number({ min: 1, max: 9 });
		
    const result  = await supertest(app).get(`/recommendations/${id}`);

    const status = result.status;
    expect(status).toEqual(200);
});
});

describe("POST /:id/upvote", () => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it("given a valid music get by id should return 200", async ()=>{
    const recommendations = createManyRecommendation();

		await prisma.recommendation.createMany({
			data: recommendations
		});
    const id = faker.datatype.number({ min: 1, max: 9 });
    const test  = await prisma.recommendation.findUnique({
      where: { id },
    });

    const result = await supertest(app).post(`/recommendations/${id}/upvote`);
    const status = result.status;
		const test2  = await prisma.recommendation.findUnique({
      where: { id },
    });


    expect(status).toBe(200);
    expect(test2.score).toBeGreaterThan(test.score);

});
});

describe("POST /:id/downvote", () => {
  beforeEach(truncateRecommendations);

  afterAll(disconnect);
  it("given a valid music get by id should return 200", async ()=>{
    const recommendations = createManyRecommendation();
		await prisma.recommendation.createMany({
			data: recommendations
		});

    const id = faker.datatype.number({ min: 1, max: 9 });
    const test  = await prisma.recommendation.findUnique({
      where: { id },
    });

    const result = await supertest(app).post(`/recommendations/${id}/downvote`);
    const status = result.status;
		const test2  = await prisma.recommendation.findUnique({
      where: { id },
    });
    expect(status).toBe(200);
    expect(test2.score).toBeLessThan(test.score);

});
});

