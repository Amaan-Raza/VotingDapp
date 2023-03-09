import React from "react";
import Image from "next/image";

import voterStyle from "../VoterCard/VoterCard.module.css";
import Style from "../Card/Card.module.css";

const VoterCard = ({ voterArray }) => {
  return (
    <div className={Style.card}>
      {voterArray.map((el, i) => (
        <div className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[4]} alt="profile" />
          </div>
          <div className={Style.card_info}>
            <h2>
              {el[1]} #{el[0].toNumber()}
            </h2>
            <p>Address: {el[3].slice(0, 30)}</p>
            <p>Details</p>
            <p className={voterStyle.vote_status}>
              {el[6] ? "You have already voted!" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
