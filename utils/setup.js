// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;
const { CreateIndex, Collection, If, Exists, Index } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  domain: "db.fauna.com"
});

function fql(fql) {
  client.query(fql)
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.log(err);
  })  
}


// create customers_by_first_and_last_name index
fql(
  If(
    Exists(Index("customers_by_first_and_last_name")),
    'INDEX "customers_by_first_and_last_name" already exists',
    CreateIndex({
      name: 'customers_by_first_and_last_name',
      source: Collection('customers'),
      unique: true,
      terms: [
        { field: ['data', 'firstName'] },
        { field: ['data', 'lastName'] }
      ]
    })   
  )
)

// create orders_by_customer index
fql(
  If(
    Exists(Index("orders_by_customer")),
    'INDEX "orders_by_customer" already exists',
    CreateIndex({
      name: 'orders_by_customer',
      source: Collection('orders'),
      terms: [
        { field: ['data', 'customer'] }
      ]
    })   
  )  
)
