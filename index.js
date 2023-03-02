const { BigQuery } = require('@google-cloud/bigquery');
const bigQuery = new BigQuery();

const functions = require('@google-cloud/functions-framework');

functions.http('getUsers', async (req, res) => {
  const sqlQuery = `
      SELECT *
            FROM \`one-global-snow-spcitf-poc.test.user\`
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