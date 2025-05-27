// /api/send.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("Method Not Allowed");
  }

  const {
    booking_time,
    location_type,
    massage_type,
    client_location,
    preferred_name,
    meeting_point,
    law_enforcement,
    disease,
    payment_method
  } = req.body;

  const bookingId = 'GTY-' + Math.floor(100000 + Math.random() * 900000);

  const emailBody = `
Booking ID: ${bookingId}
Time: ${booking_time}
In/Outcall: ${location_type}
Massage Type: ${massage_type}
Client Location: ${client_location}
Preferred Name: ${preferred_name}
Meeting Point: ${meeting_point}
Law Enforcement Affiliation: ${law_enforcement}
Disease: ${disease}
Payment Method: ${payment_method}
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Booking Request - ${bookingId}`,
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.writeHead(302, { Location: `/thankyou.html?booking_id=${bookingId}` });
    res.end();
  } catch (error) {
    res.status(500).send("Failed to send email: " + error.message);
  }
}
