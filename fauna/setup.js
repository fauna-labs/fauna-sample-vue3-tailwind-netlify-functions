// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;
const { CreateIndex, Collection, If, Exists, Index } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  domain: process.env.FAUNA_DOMAIN
});

// create customers_by_first_and_last_name index
client.query(
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
.then(res=>{
  console.log(res);
})
.catch(err=>{
  console.log(err);
})