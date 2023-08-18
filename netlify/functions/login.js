// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Client, fql } from "fauna";

exports.handler = async function (event, context) {
  const payload = JSON.parse(event.body);
  if (event.httpMethod === 'POST') {
    try {
      const client = new Client({secret: process.env.FAUNA_KEY});

      const res = await client.query(fql`
      Credentials.byDocument(
        customers.byFirstAndLastName(${payload.firstName}, ${payload.lastName}).first()
      )!
      .login(${payload.password})
      `);

      client.close();
  
      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };  
    } catch(e) {
      return {
        statusCode: 400,
        body: `${e}`
      };
    }
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};