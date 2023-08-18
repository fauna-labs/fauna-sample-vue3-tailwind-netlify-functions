// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Client, fql, QueryInfo } from "fauna";

exports.handler = async function (event, context) {
  // checks if logged in
  const token = event.headers.authorization.split('Bearer ')[1];  
  let loggedInUser = null;
  try {
    const client = new Client({secret: token});
    const res = await client.query(fql`Query.identity()`);
    client.close();
    loggedInUser = res.data;
  } catch(e) {
    return {
      statusCode: e.httpStatus,
      body: JSON.stringify({ error: e.code })
    };
  }
  
  // ----------------
  // GET My Orders
  // ----------------
  if (event.httpMethod === 'GET') {
    try {
      const client = new Client({secret: token});

      const res = await client.query(fql`
        orders.byCustomer(${loggedInUser}) {
          id,
          status,
          creationDate,
          cart
        }
      `);

      client.close();
      
      return {
        statusCode: 200,
        body: JSON.stringify(res.data.data),
      };
    }
    catch(e) {
      return {
        statusCode: e.httpStatus,
        body: JSON.stringify({ error: e.code })
      };
    }
  }

  // ----------------
  // SUBMIT ORDER
  // ----------------
  if (event.httpMethod === 'POST') {
    const payload = JSON.parse(event.body);
    const cart = payload.products;
    const shippingAddress = payload.shippingAddress;
    const paymentInfo = payload.paymentInfo;

    try {
      const client = new Client({secret: process.env.FAUNA_KEY});  

      const res = await client.query(fql`
      ${cart}.forEach(x=>{              
        let p = products.byId(x.productId)
        let updatedQty = p!.quantity - x.quantity
  
        if (updatedQty < 0) {                  
          abort("Insufficient stock for product " + p!.name + ": Requested quantity=" + x.quantity.toString())
        } else {
          p!.update({
            quantity: updatedQty,
            backordered: p!.backorderedLimit > updatedQty
          })
        }
      })
        
      orders.create({
        customer: ${loggedInUser},
        creationDate: Time.now(),
        status: 'processing',
        cart: ${cart}.map(x=>{
          product: products.byId(x.productId),
          quantity: x.quantity,
          price: products.byId(x.productId)!.price
        }),
        deliveryAdress: ${shippingAddress},
        creditCard: ${paymentInfo}
      }) {
        id,
        creationDate
      }
      `);

      client.close();
  
      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };

    }
    catch(e) {
      return {
        statusCode: e.httpStatus,
        body: JSON.stringify({ error: e.code })
      };
    }
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};

