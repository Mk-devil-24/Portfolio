import React from 'react';

function Contact() {
  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <form>
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
