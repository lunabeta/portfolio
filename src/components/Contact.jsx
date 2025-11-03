import React from 'react';

export default function Contact() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [website, setWebsite] = React.useState(''); // honeypot
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error
  const [error, setError] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in name, email, and message.');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send');
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setWebsite('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setStatus('error');
    }
  }

  return (
    <section>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'none' }}>
          <label>
            Website
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
        </div>

        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Message
            <textarea
              name="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>

        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
        {status === 'success' ? <p style={{ color: 'green' }}>Thanks! Your message has been sent.</p> : null}

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}


