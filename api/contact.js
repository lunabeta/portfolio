const nodemailer = require('nodemailer');

async function readRequestBody(req) {
	if (req.body) {
		// May already be parsed (Next.js API) or a string
		if (typeof req.body === 'string') {
			try { return JSON.parse(req.body); } catch { return {}; }
		}
		return req.body;
	}

	return await new Promise((resolve) => {
		let data = '';
		req.on('data', (chunk) => { data += chunk; });
		req.on('end', () => {
			try { resolve(JSON.parse(data || '{}')); }
			catch { resolve({}); }
		});
	});
}

module.exports = async (req, res) => {
	if (req.method !== 'POST') {
		res.statusCode = 405;
		return res.end(JSON.stringify({ message: 'Method not allowed' }));
	}

	try {
		const { name, email, subject, message, website } = await readRequestBody(req);

		// Honeypot field for bots
		if (website) {
			res.statusCode = 200;
			return res.end(JSON.stringify({ ok: true }));
		}

		if (!name || !email || !message) {
			res.statusCode = 400;
			return res.end(JSON.stringify({ message: 'Missing required fields' }));
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

		res.statusCode = 200;
		return res.end(JSON.stringify({ ok: true, id: info.messageId }));
	} catch (err) {
		console.error(err);
		res.statusCode = 500;
		return res.end(JSON.stringify({ message: 'Failed to send email' }));
	}
};


