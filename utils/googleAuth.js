const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Audience in token:", payload.aud);
    console.log("Expected audience:", process.env.GOOGLE_CLIENT_ID);
    
    return {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        googleId: payload.sub,
    };
};

module.exports = verifyGoogleToken;
