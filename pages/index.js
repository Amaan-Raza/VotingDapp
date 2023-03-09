import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

//INTERNAL IMPORT
import { VotingContext } from "../context/Voter";
import Style from "../styles/index.module.css";
import Card from "../components/card/card";

const index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    getAllVoterData,
    currentAccount,
    voterLength,
  } = useContext(VotingContext);

  useEffect(() => {
    // getNewCandidate();
    // console.log(candidateArray);/
    checkIfWalletIsConnected();
    getAllVoterData();
  }, []);

  return (
    <div className={Style.home}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>
                Candidates:<span>{candidateLength}</span>
              </p>
            </div>
            <div className={Style.candidate_list}>
              <p>
                Voters:<span>{voterLength}</span>
              </p>
            </div>
          </div>
          <div className={Style.winner_message}>
            <small>
              <Countdown date={Date.now() + 100000} />
            </small>
          </div>
        </div>
      )}

      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  );
};

export default index;
