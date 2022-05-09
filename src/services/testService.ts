import truncate  from "../repositories/testsRepository.js"; 

export async function deleteAll() {
  await truncate();
}