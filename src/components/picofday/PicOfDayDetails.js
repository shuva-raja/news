import React, { useEffect, useState } from "react";
import axios from "axios";
import date from "../Time";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const PicOfDayDetails = () => {
  const [picOfDayData, setPicOfDayData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=DCzrOBm5L1XwULLQQCt4A318hnN8QI1ZnVsrCtza");
        const data = response.data;
        setPicOfDayData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching picture of the day data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const shareUrl = window.location.href;

  return (
    <div className="article">
      <div className="articlesection">
        <div className="title">{picOfDayData.title}</div>
        <img src={picOfDayData.hdurl} alt={picOfDayData.title} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "15px",
          }}
          className="social-buttons"
        >
          <EmailShareButton url={shareUrl} title={picOfDayData.title}>
            <AiOutlineMail size={32} />
          </EmailShareButton>
          <FacebookShareButton url={shareUrl} title={picOfDayData.title}>
            <FaFacebook size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={picOfDayData.title}>
            <FaTwitter size={32} />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={picOfDayData.title}>
            <FaWhatsapp size={32} />
          </WhatsappShareButton>
        </div>
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px" }}>
          {date(picOfDayData.date)}
        </p>
        <p>{(picOfDayData.explanation)}</p>
      </div>
    </div>
  );
};

export default PicOfDayDetails;
