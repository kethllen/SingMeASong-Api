import { testsRepository } from "../repositories/testsRepository.js"


async function deleteAll() {
  await testsRepository.truncate();
}
async function seed(body) {
  await testsRepository.seed(body);
}

export const testsService ={
  deleteAll,
  seed
};