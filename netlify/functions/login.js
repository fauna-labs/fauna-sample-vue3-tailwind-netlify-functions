// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const faunadb = require('faunadb');
const q = faunadb.query;
const { Login, Select, Paginate, Match, Index} = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  domain: process.env.FAUNA_DOMAIN
});

exports.handler = async function (event, context) {
  const payload = JSON.parse(event.body);
  if (event.httpMethod === 'POST') {

    let res = await client.query(
      Login(
        Select(
          ['data', 0], 
          Paginate(
            Match(
              Index('customers_by_first_and_last_name'), 
              [payload.firstName, payload.lastName]
            )
          )
        ),
        { password: payload.password }
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};