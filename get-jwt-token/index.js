const { GoogleAuth } = require('google-auth-library');
const functions = require('@google-cloud/functions-framework');

const auth = new GoogleAuth();

functions.http('getJWTToken', async (req, res) => {
  try {
    const targetAudience = req.query.audience;
    const client = await auth.getIdTokenClient(targetAudience);

    res.status(200).send(await client.idTokenProvider.fetchIdToken(targetAudience));
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error get JWT Token: ${err}`);
  }
});