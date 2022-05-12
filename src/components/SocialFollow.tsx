import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";*/
import instegramIcon from "../assets/Instagram_logo_2016.svg.webp";
import whatsappIcon from "../assets/whatsapp-icon.png";
import faceBookIcon from "../assets/Facebook_Logo_2.png";

const SocialFollow = () => {
  return (
    <div
      style={{
        // background: "#eee",
        padding: "25px 50px",
        position: "fixed",
        bottom: "0",
        right: "0",
      }}
    >
      <a
        href='https://www.facebook.com'
        className='facebook social'
        style={{ color: "#4968ad", margin: "0 1rem" }}
      >
        <img src={faceBookIcon} width='50' height='50' />
      </a>

      <a
        href='https://www.instagram.com'
        className='instagram_social'
        style={{ color: "#517fa4" }}
      >
        <img src={instegramIcon} width='50' height='50' />
      </a>

      <a
        href='https://wa.me/972505661676'
        className='whatsapp social'
        style={{ color: "green", margin: "0 1rem" }}
      >
        <img src={whatsappIcon} width='50' height='50' />
      </a>
    </div>
  );
};

export default SocialFollow;
