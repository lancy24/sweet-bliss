// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendOTP = async (email, otp) => {
//   const mailOptions = {
//     from: `"Blissful Bites 🧁" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your OTP for Blissful Bites",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #fff5f8; border-radius: 12px;">
//         <h2 style="color: #e94e77; text-align: center;">🧁 Blissful Bites</h2>
//         <h3 style="text-align: center; color: #673f5b;">Email Verification</h3>
//         <p style="text-align: center; color: #666;">Use this OTP to verify your email:</p>
//         <div style="text-align: center; margin: 24px 0;">
//           <span style="font-size: 36px; font-weight: bold; color: #e94e77; letter-spacing: 8px; background: white; padding: 16px 24px; border-radius: 12px; border: 2px dashed #e94e77;">
//             ${otp}
//           </span>
//         </div>
//         <p style="text-align: center; color: #999; font-size: 13px;">This OTP expires in 10 minutes.</p>
//         <p style="text-align: center; color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
//       </div>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendOTP;