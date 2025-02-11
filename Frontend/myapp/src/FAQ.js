// src/HostelProject/FAQ.js
import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "Is there a minimum stay requirement?",
      answer: "Yes, we have a minimum stay requirement of [insert number of nights], but feel free to inquire about special offers for longer stays."
    },
    {
      question: "What amenities are available at Skyline Stay?",
      answer: (
        <ul>
          <li>Free Wi-Fi</li>
          <li>Fully equipped kitchen</li>
          <li>Laundry facilities</li>
          <li>Common lounge area</li>
          <li>Outdoor terrace</li>
          <li>Secure lockers</li>
        </ul>
      )
    },
    {
      question: "Are meals included in the stay?",
      answer: "We provide breakfast, lunch, and dinner options for our guests. You can also use our kitchen to prepare your meals, or explore nearby dining options."
    },
    {
      question: "Is there parking available at the hostel?",
      answer: "Yes, we offer on-site parking for guests. Please reserve your parking spot in advance as spaces are limited."
    },
    {
      question: "How can I contact you for more information?",
      answer: "You can reach us via email at  info@Skyline Stay.com."
    }
  ];

  return (
    <div className="container my-5 content-wrapper">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h5>{faq.question}</h5>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
