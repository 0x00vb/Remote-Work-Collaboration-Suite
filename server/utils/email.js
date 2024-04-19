const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendPasswordResetEmail = async (email, resetToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    text: `You are receiving this email because you (or someone else) has requested a password reset for your account.
    
    Please use the following link to reset your password:
    
    ${process.env.BASE_URL}/reset-password/${resetToken}
    
    If you did not request this, please ignore this email and your password will remain unchanged.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

// Function to send an invitation email
exports.sendInvitationEmail = async (email, inviteLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'You have been invited to join our collaboration suite',
    text: `You have been invited to join our remote work collaboration suite.
    
    Please use the following link to sign up and join your team:
    
    ${inviteLink}
    
    We look forward to having you on board!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Invitation email sent');
  } catch (error) {
    console.error('Error sending invitation email:', error);
  }
};

// Function to send a notification email
exports.sendNotificationEmail = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent');
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};