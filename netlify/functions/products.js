// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Client, fql } from "fauna";



exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    try {
      const client = new Client({secret: process.env.FAUNA_SECRET});

      const res = await client.query(fql`
      products.all() {
        id,
        price,
        name,
        description
      }
      `);
  
      client.close();
      
      return {
        statusCode: 200,
        body: JSON.stringify(res.data.data),
      };  
    } catch(e) {
      console.log(e)
    }
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};