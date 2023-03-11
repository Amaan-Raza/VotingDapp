import React from "react";
import Image from "next/image";

import voterStyle from "../VoterCard/VoterCard.module.css";
import Style from "../Card/Card.module.css";

const VoterCard = ({ voterArray }) => {
  return (
    <div className={Style.card}>
      {voterArray.map((el, i) => (
        <div key={i + 1} className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[4]} alt="profile" />
          </div>
          <div className={Style.card_info}>
            <h2>
              {el[1]} #{el[0].toNumber()}
            </h2>
            <div className={voterStyle.about}>
              <p>Address: {el[3].slice(0, 10)}</p>
              <p
                className={
                  el[6] ? voterStyle.vote_status_voted : voterStyle.vote_status
                }
              >
                {el[6] ? "Voted" : "Not Voted"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
