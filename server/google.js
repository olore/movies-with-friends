// from https://developers.google.com/identity/sign-in/web/backend-auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  // const userid = payload["sub"]; // see payload below
  return payload;
};

module.exports = { verify };

/*
{ iss: 'accounts.google.com',
[server]   azp:
[server]    '363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4.apps.googleusercontent.com',
[server]   aud:
[server]    '363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4.apps.googleusercontent.com',
[server]   sub: '115421541579403932091',
[server]   hd: 'olore.net',
[server]   email: 'brian@olore.net',
[server]   email_verified: true,
[server]   at_hash: 'YjUpWQQ7wwjIMOGp_QBAww',
[server]   name: 'Brian Olore',
[server]   picture:
[server]    'https://lh3.googleusercontent.com/a-/AOh14Ggo6byH6db24lzXv5lb3ZRPkJi2mSFv7gW6_8WK=s96-c',
[server]   given_name: 'Brian',
[server]   family_name: 'Olore',
[server]   locale: 'en',
[server]   iat: 1590499126,
[server]   exp: 1590502726,
[server]   jti: 'd43c85ee508045c2018b10633e4b06d15d9d69b2' }
*/
