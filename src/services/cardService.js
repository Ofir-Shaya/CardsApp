import httpService from "./httpService";

export function createCard(card) {
  return httpService.post("/cards", card);
}

export function getCard(id) {
  return httpService.get(`/cards/${id}`);
}

export function getAll() {
  return httpService.get("/cards/my-cards");
}

export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}

export function updateCard(id, card) {
  return httpService.put(`/cards/${id}`, card);
}

const cardsService = {
  createCard,
  getCard,
  getAll,
  deleteCard,
  updateCard,
};
export default cardsService;
