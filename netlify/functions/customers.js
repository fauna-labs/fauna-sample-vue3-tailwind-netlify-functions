// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Client, fql } from "fauna";

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    try {
      const token = event.headers.authorization.split('Bearer ')[1];

      const client = new Client({secret: token});

      const res = await client.query(fql`Query.identity()`);
      
      client.close();

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