import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";

import { useRouter } from "next/router";

import { VotingAddress, VotingAddressABI } from "./constants";

// const client = ipfsHttpClient("https://api.pinata.cloud/pinning/pinFileToIPFS");
function getAccessToken() {
  return "Your_privateKey";
}
const client = new Web3Storage({ token: getAccessToken() });

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const votingTitle = "My first";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);

  //END OF CANDIDATE DATA

  const [error, setError] = useState("");
  const highestVote = [];

  //VOTER SECTION

  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);

  //CONNECTING WALLET

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("Please install MetaMask and reload");
    }
  };

  //CONNECT WALLET

  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please install MetaMask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };

  //UPLOAD TO IPFS VOTER IMAGE

  // const uploadToIpfs = async (file) => {
  //   try {
  //     const added = await client.add({ content: file });

  //     const url = `http://ipfs.infura.io/ipfs/${added.path}`;
  //     return url;
  //   } catch (error) {
  //     setError("Error uploading file to IPFS");
  //   }
  // };

  const uploadToIpfs = async (file) => {
    const cid = await client.put(file);
    const url = `https://${cid}.ipfs.w3s.link/${file[0].name}`;
    //console.log("stored files with cid:", cid);

    return url;
  };

  //UPLOAD TO IPFS candidate IMAGE
  const uploadToIpfsCandidate = async (file) => {
    const cid = await client.put(file);
    const url = `https://${cid}.ipfs.w3s.link/${file[0].name}`;
    //console.log("stored files with cid:", cid);

    return url;
  };

  //   CREATE VOTER

  function makeFileObjects(obj) {
    const buffer = Buffer.from(JSON.stringify(obj));

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([buffer], "hello.json"),
    ];
    return files;
  }
  const createVoter = async (formInput, fileUrl, router) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position)
        return console.log("Input data invalid");
      //Connecting Smart Contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = makeFileObjects({ name, address, position, image: fileUrl });
      const cid = await client.put(data);
      const url = `https://${cid}.ipfs.dweb.link/hello.json`;

      const voter = await contract.voterRight(address, name, url, fileUrl);
      voter.wait();

      router.push("/voterList");
    } catch (error) {
      setError("Error in creating Voter");
    }
  };

  const getAllVoterData = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      //  VOTER LIST
      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);

      voterListData.map(async (el) => {
        const singleVoterData = await contract.getVoterData(el);

        pushVoter.push(singleVoterData);
      });

      //   VOTER LENGTH
      const voterList = await contract.getVoterLength();
      setVoterLength(voterList.toNumber());
    } catch (error) {
      setError("Something weent wring fetching data");
    }
  };

  // useEffect(() => {
  //   getAllVoterData();
  // }, []);

  //  GIVE VOTE
  const giveVote = async (id) => {
    try {
      const voterAddress = id.address;
      const voterId = id.id;
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voteredList = await contract.vote(voterAddress, voterId);
      console.log(voteredList);
    } catch (error) {
      console.log(error);
    }
  };

  //     CANDIDATE SECTION
  const setCandidate = async (candidateForm, fileUrl, router) => {
    try {
      const { name, address, age } = candidateForm;
      if (!name || !address || !age) return setError("Input data invalid");

      console.log(name, address, age, fileUrl);
      //Connecting Smart Contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = makeFileObjects({ name, address, image: fileUrl, age });
      const cid = await client.put(data);
      const ipfs = `https://${cid}.ipfs.dweb.link/hello.json`;

      const candidate = await contract.setCandidate(
        address,
        age,
        name,
        fileUrl,
        ipfs
      );
      candidate.wait();

      console.log(candidate);
      router.push("/");
    } catch (error) {
      setError("Error in creating Voter");
    }
  };

  // GET CANDIDATE DATA
  const getNewCandidate = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      // ALL CANDIDATE
      const allCandidate = await contract.getCandidate();

      allCandidate.map(async (el) => {
        const singleCandidateData = await contract.getCandidateData(el);
        pushCandidate.push(singleCandidateData);
        candidateIndex.push(singleCandidateData[2].toNumber());
      });

      //  CANDIDATE LENGTH
      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewCandidate();
  }, []);
  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIpfs,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray,
        uploadToIpfsCandidate,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
