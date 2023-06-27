// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const faunadb = require('faunadb');
const q = faunadb.query;
const { Get, CurrentIdentity } = q;

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    try {
      const token = event.headers.authorization.split('Bearer ')[1];

      const client = new faunadb.Client({
        secret: token,
        domain: "db.fauna.com"
      });

      let res = await client.query(
        Get(CurrentIdentity())
      );

      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };          

    } catch(e) {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      };
    }  
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};