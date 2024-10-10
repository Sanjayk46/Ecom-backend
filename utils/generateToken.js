// // const jwt= require('jsonwebtoken');

// //  const generateToken = (req, res, userId) => {
// //   // Generating a JWT token for the authenticated user
// //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// //     expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h'
// //   });

// //   // Setting the JWT as an HTTP-only cookie for enhanced security
// // //  res.cookie('jwt', token, {
// //  //   httpOnly: true,
// //  //   secure: process.env.NODE_ENV !== 'development',
// //   //  sameSite: 'Lax',
// //  //   maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
// // //  });
// // };
// // module.exports= {generateToken};
const jwt = require('jsonwebtoken');

const generateToken = (req, res, userId) => {
  try {
    // Determine expiration time based on 'remember me' option
    const expiration = req.body.remember ? '365d' : '24h';

    // Generate JWT token with user ID and expiration
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: expiration
    });

    // Set the JWT token as an HTTP-only cookie with secure settings
    res.cookie('jwt', token, {
      httpOnly: true, // Prevent access by client-side JavaScript
      secure: process.env.NODE_ENV === 'production', // Use HTTPS only in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Allows cross-origin in production
      maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // Cookie expiration in milliseconds
    });

    res.status(200).json({ message: 'Token generated and cookie set successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error generating token' });
  }
};

module.exports = { generateToken };
