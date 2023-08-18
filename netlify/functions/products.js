// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Client, fql } from "fauna";



exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    const client = new Client({secret: process.env.FAUNA_KEY});

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
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};