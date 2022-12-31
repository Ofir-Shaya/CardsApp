import { useEffect, useState } from "react";
import cardService from "../services/cardService";

export const useMyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const { data } = await cardService.getAll();

      setCards(data);
    };

    getCards();
  }, []);

  return cards;
};
