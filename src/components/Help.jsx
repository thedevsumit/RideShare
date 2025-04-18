import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import Navigaton from "./Navigation";
const Help = ({ sidebar, setSidebar }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const userEmail = localStorage.getItem("currLoggedInUser");

    if (!userEmail) {
      Swal.fire(
        "Not Logged In",
        "Please log in to send us a message.",
        "error"
      );
      return;
    }

    if (message.trim().length === 0) {
      Swal.fire(
        "Empty Message",
        "Please write something before sending.",
        "warning"
      );
      return;
    }

    const templateParams = {
      user_email: userEmail,
      message,
    };

    emailjs
      .send(
        "service_8s4d2ki",
        "template_6xsfxtk",
        templateParams,
        "JifYqhhdqIB67-9nF"
      )
      .then(() => {
        Swal.fire(
          "Sent!",
          "Your message has been sent successfully 📩",
          "success"
        );
        setMessage("");
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        Swal.fire(
          "Error",
          "Could not send message. Please try again later.",
          "error"
        );
      });
  };

  return (
    <>
    <Header/>
    <Navigaton/>
    <div className="parentc">
      <div
        className="contact-container"
        onClick={() => {
          if (sidebar === 1) {
            setSidebar(0);
          }
        }}
      >
        <h1 className="contact-header">Contact RideShare Support</h1>
        <p className="contact-subtext">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <div className="contact-form">
          <textarea
            className="contact-textarea"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
          <button className="contact-send-btn" onClick={handleSend}>
            Send Message
          </button>
        </div>

        <p className="contact-footer">
          We’ll get back to you via your registered email.
        </p>
        <div className="contact-other-methods">
          <h2 className="contact-subheader">Other Ways to Reach Us</h2>

          <a href="mailto:helprideshare@gmail.com" className="contact-link">
            <FaEnvelope style={{ marginRight: "8px" }} />
            helprideshare@gmail.com
          </a>

          <a href="tel:+18001234567" className="contact-link">
            <FaPhoneAlt style={{ marginRight: "8px" }} />
            +91 9041627594
          </a>

          <a
            href="https://wa.me/9041627594"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            {" "}
            <FaWhatsapp style={{ marginRight: "8px" }} />
            WhatsApp Chat
          </a>

          <a
            href="https://instagram.com/rideshare"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaInstagram style={{ marginRight: "8px" }} />
            Instagram
          </a>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Help;
