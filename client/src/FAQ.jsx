import React, { useState } from 'react';
import './FAQ.css'; // Optional if you have styles

const faqData = [
  {
    question: 'What are your bakery hours?',
    answer: 'We’re open daily from 11:00 AM to 1:00 AM, including weekends.',
  },
  {
    question: 'Do you offer home delivery?',
    answer:
      'Yes! We offer delivery within 10 km radius. Delivery charges may apply depending on location.',
  },
  {
    question: 'Do you make custom cakes?',
    answer:
      'Yes! We specialize in custom cakes for birthdays, weddings, baby showers, and corporate events. You can choose design, size, and flavor.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: (
      <ul>
        <li>Cash</li>
        <li>UPI (Google Pay, PhonePe, Paytm)</li>
        <li>Debit/Credit Cards</li>
      </ul>
    ),
  },
  {
    question: 'What if I need to cancel or change my order?',
    answer:
      'Cancellations made 24 hours in advance are eligible for rescheduling or partial refund. Custom cakes are non-refundable once prepared.',
  },
  {
    question: 'Do you offer hampers or gift boxes?',
    answer:
      'Yes! We make custom gift hampers with cookies, cupcakes, chocolates, teddies, cakes, small gift items and more.',
  },
  {
    question: 'Do you offer dairy-free or vegan cakes?',
    answer:
      'Yes, we offer dairy-free and fully vegan cakes upon pre-order. Please give us 1–2 days\' notice.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h5 data-aos="flip-up">First Time Ordering? Let Us Help!</h5>

      {faqData.map((item, index) => (
        <div id="question"
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          key={index}
        >
          <button
            className="faq-question"
            onClick={() => toggleAnswer(index)}
          >
            {item.question}
          </button>
          {activeIndex === index && (
            <div className="faq-answer">
              <div className='ans'>
              <p>{item.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQ;
