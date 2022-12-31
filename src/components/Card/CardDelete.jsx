import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import cardService from "../../services/cardService";

const CardDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteCard = async () => {
      await cardService.deleteCard(id);
      navigate("/my-cards");
    };

    deleteCard();
  }, [navigate]);
  return null;
};

export default CardDelete;
