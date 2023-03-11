import React, { useState, useCallback, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
var axios = require("axios");

import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import uploadPic from "../assets/upload.png";
import creatorPic from "../assets/creator.png";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToIpfs, createVoter, voterArray, getAllVoterData } =
    useContext(VotingContext);

  //VOTERS IMAGE DROP

  const onDrop = useCallback(async (acceptedFile) => {
    //console.log(acceptedFile);
    const url = await uploadToIpfs(acceptedFile);
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxsize: 5000000,
  });

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
          <div className={Style.voterInfo}>
            <img src={fileUrl} alt="Voter Image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name: <span> {formInput.name}</span>
              </p>
              <p>
                Add: <span> {formInput.address.slice(0, 10)}</span>
              </p>
              <p>
                Age: <span> {formInput.position}</span>
              </p>
            </div>
          </div>
        )}

        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create Candidate For Voting</h4>
              <p>Blockchain voting organization, provide ethereum ecosystem</p>
              <p className={Style.sideInfo_para}>Voter List</p>
              <div className={Style.card}>
                {voterArray.map((el, i) => (
                  <div key={i + 1} className={Style.card_box}>
                    <div className={Style.image}>
                      <img src={el[4]} alt="Profile Photo" />
                    </div>
                    <div className={Style.card_info}>
                      <p>{el[1]}</p>
                      <p>Address: {el[3].slice(0, 10)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Voter</h1>
          <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className={Style.voter_container_box_div_info}>
                  <p>Upload File: JPG,PNG, GIF, WEBM Max 10MB</p>
                  <div className={Style.voter_container_box_div_image}>
                    <Image
                      src={uploadPic}
                      width={150}
                      height={150}
                      objectFit="contain"
                      alt="File Upload"
                    />
                  </div>
                  <p>Drag and Drop File</p>
                  <p>or Browse Media on your device</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Style.input_container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Voter Name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setFormInput({ ...formInput, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Age"
            placeholder="Voter Age"
            handleClick={(e) =>
              setFormInput({ ...formInput, position: e.target.value })
            }
          />

          <div className={Style.Button}>
            <Button
              btnName="Authorize Voter"
              handleClick={() => createVoter(formInput, fileUrl, router)}
            />
          </div>
        </div>
      </div>

      {/* {jdskahfalk;j;d} */}
      <div className={Style.createdVoter}>
        <div className={Style.createdVoted_info}>
          <Image src={creatorPic} width={150} height={150} alt="User Photo" />
          <p>Notice for User</p>
          <br />
          <p>
            Organizer <span>0x989..</span>
          </p>
          <br />
          <p>
            Only Organizer of the voting contract can create voter for election.
          </p>
        </div>
      </div>
    </div>
  );
};

export default allowedVoters;
