const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true }); 
admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOTPEmail = functions.https.onCall(async (data, context) => {
  cors(req, res, async () => {const email = data.email;
    const otp = generateOTP();
  
    const mailOptions = {
      from: gmailEmail,
      to: email,
      subject: 'Your OTP for Signup',
      text: `Your OTP is: ${otp}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      return { success: true, otp };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new functions.https.HttpsError('internal', 'Failed to send OTP email');
    }})
  
});

exports.deleteUnverifiedUsers = functions.pubsub.schedule('every 1 minutes').timeZone('Your-Timezone').onRun(async (context) => {
  const cutoffTime = Date.now() - 30 * 60 * 1000; // 30 minutes ago
  const unverifiedUsersSnapshot = await admin.auth().listUsers(1000, undefined, 'emailVerified==false');

  unverifiedUsersSnapshot.users.forEach(async (user) => {
    if (user.metadata.creationTime < cutoffTime) {
      console.log(`Deleting unverified user: ${user.uid}`);
      await admin.auth().deleteUser(user.uid);
    }
  });

  return null;
});
