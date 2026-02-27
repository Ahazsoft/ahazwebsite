const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT;// || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST /api/apply
app.post('/api/apply', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, jobTitle, company } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !jobTitle) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Configure Nodemailer transporter

    // Ideally, set EMAIL_USER and EMAIL_PASS in your environment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,// || 'your-email@gmail.com', // fallback for testing
        pass: process.env.EMAIL_PASS //|| 'your-app-password',
      },
    });

    // Email to applicant
    const mailOptions = {
      from: `"${company}"`,
      to: email,
      subject: `Application Received: ${jobTitle} at ${company}`,
      html: `
        <h2>Dear ${firstName} ${lastName},</h2>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${company}</strong>.</p>
        <p>We have received your application and will review it shortly. If your qualifications match our requirements, we will contact you for the next steps.</p>
        <br/>
        <p>Best regards,<br/>The Recruitment Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // data handling implementation

    res.status(200).json({
      message: 'Application submitted successfully. A confirmation email has been sent.',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send confirmation email.'});
  }
});



// Optional: a test route
app.get('/health', (req, res) => {
  res.send('Job Application API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});