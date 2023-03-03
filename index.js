const { BigQuery } = require('@google-cloud/bigquery');
const { GoogleAuth } = require('google-auth-library');
const functions = require('@google-cloud/functions-framework');

const bigQuery = new BigQuery();
const auth = new GoogleAuth();

functions.http('getUsers', async (req, res) => {
  const sqlQuery = `
      SELECT * FROM \`one-global-snow-spcitf-poc.test.user\`
      `;

  const options = {
    query: sqlQuery
  };

  try {
    const [rows] = await bigQuery.query(options);

    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error querying BigQuery: ${err}`);
  }
});

functions.http('getUsersWithAuth', async (req, res) => {
  const sqlQuery = `
      SELECT * FROM \`one-global-snow-spcitf-poc.test.user\`
      `;

  const options = {
    query: sqlQuery
  };

  try {
    const [rows] = await bigQuery.query(options);

    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error querying BigQuery: ${err}`);
  }
});

functions.http('getJWTToken', async (req, res) => {
  try {
    const targetAudience = 'https://nodejs-http-function-ak6gvm3uoq-as.a.run.app/getUsersWithAuth';
    const client = await auth.getIdTokenClient(targetAudience);

    res.status(200).send(await client.idTokenProvider.fetchIdToken(targetAudience));
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error get JWT Token: ${err}`);
  }
});