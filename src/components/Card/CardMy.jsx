import React from "react";
import { Link } from "react-router-dom";

import PageHeader from "../common/PageHeader";
import { useMyCards } from "../../hooks/UseMyCards";
import Card from "./Card";

const CardMy = () => {
  const cards = useMyCards();

  return (
    <>
      <PageHeader
        title={"Welcome "}
        description={"We hope you enjoy your stay."}
      />
      <div className="row">
        <Link to="/create-card">Create a New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p>No Cards..</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};

export default CardMy;
