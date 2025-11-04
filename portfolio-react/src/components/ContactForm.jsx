import { useState } from 'react';

function ContactForm() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        setFeedback('✅ Message sent successfully!');
        e.target.reset();
      } else {
        setFeedback('❌ Something went wrong. Try again.');
      }
    } catch {
      setFeedback('❌ Network error. Please check your connection.');
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} action="https://formspree.io/f/your-id">
      {/* Add your form fields here */}
      <p id="form-feedback" className="show">{feedback}</p>
    </form>
  );
}

export default ContactForm;