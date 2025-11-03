const nodemailer = require('nodemailer');

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
	}

	try {
		const { name, email, subject, message, website } = JSON.parse(event.body || '{}');

		// Honeypot: if filled, ignore silently
		if (website) {
			return { statusCode: 200, body: JSON.stringify({ ok: true }) };
		}

		if (!name || !email || !message) {
			return { statusCode: 400, body: JSON.stringify({ message: 'Missing required fields' }) };
		}

		const smtpPort = Number(process.env.SMTP_PORT || 587);
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: smtpPort,
			secure: smtpPort === 465,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: `"${name}" <${process.env.FROM_EMAIL}>`,
			to: process.env.TO_EMAIL,
			subject: subject ? `[Portfolio] ${subject}` : '[Portfolio] New message',
			text: `From: ${name} <${email}>\n\n${message}`,
			html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${String(message).replace(/\n/g, '<br/>')}</p>`,
			replyTo: email,
		});

		return { statusCode: 200, body: JSON.stringify({ ok: true, id: info.messageId }) };
	} catch (err) {
		console.error(err);
		return { statusCode: 500, body: JSON.stringify({ message: 'Failed to send email' }) };
	}
};


