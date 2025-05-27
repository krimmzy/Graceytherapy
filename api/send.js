const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const body = req.body;

  const bookingId = "GTY-" + Math.floor(100000 + Math.random() * 900000);

  const emailBody = `
Booking ID: ${bookingId}
Time: ${body.booking_time}
In/Outcall: ${body.location_type}
Massage Type: ${body.massage_type}
Client Location: ${body.client_location}
Preferred Name: ${body.preferred_name}
Meeting Point: ${body.meeting_point}
Law Enforcement Affiliation: ${body.law_enforcement}
Disease: ${body.disease}
Payment Method: ${body.payment_method}
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Booking Request - ${bookingId}`,
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.writeHead(302, {
      Location: `/thankyou.html?booking_id=${bookingId}`,
    });
    res.end();
  } catch (error) {
    res.status(500).send("Failed to send email: " + error.message);
  }
}
