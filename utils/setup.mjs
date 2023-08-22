import { Client, fql } from "fauna";
import 'dotenv/config';
import { customers, stores, products, orders} from './data.mjs';

const client = new Client({ secret: process.env.FAUNA_SECRET });

async function setupCollection(collection, data) {  
  try {
    let res = await client.query(fql`
      let createColl = Collection.byName(${collection}) == null
      if (createColl) {
        Collection.create({
          name: ${collection}
        })
      }
    `)

    let postProcess = null;
    switch(collection) {
      case 'products':
        postProcess = fql`
          ${data.coll}.byId(newdoc.id)!.update({
            store: stores.byId(newdoc.store)
          })
        `
        break;
      case 'orders':
        await client.query(fql`
          Collection.byName(${collection})!.update({
            indexes: {
              byCustomer: {
                terms: [
                  { field: "customer" }
                ]
              }
            }
          })
        `);     
        postProcess = fql`
          ${data.coll}.byId(newdoc.id)!.update({
            customer: customers.byId(newdoc.customer),
            creationDate: Time(newdoc.creationDate),
            orderProducts: newdoc.orderProducts.map(x=>{
              Object.assign(x, { product: products.byId(x.product) })
            })
          })
        `      
        break;
      case 'customers':
        await client.query(fql`
          Collection.byName(${collection})!.update({
            indexes: {
              byFirstAndLastName: {
                terms: [
                  { field: "firstName" },
                  { field: "lastName" },
                ]
              }
            }
          })
        `);
        postProcess = fql`Credentials.create({
          document: newdoc,
          password: "fauna-demo"
        })`;
        break;
      default:
        postProcess = fql`newdoc.id`;
    }

    res = await client.query(fql`
      ${data.data}.map(x=>{
        if (!${data.coll}.byId(x.id).exists()) {
          let newdoc = ${data.coll}.create(x)
          ${postProcess}
        }
      })
    `)
    console.log(res.data)
  } catch(err) {
    console.log(err)
  }
}

async function setupRoles() {  
  try {
    const res = await client.query(fql`
      if (Role.byName("customerRole") == null) {
        Role.create({
          name: "customerRole",
          membership: [{ resource: "customers" }],
          privileges: [
            {
              resource: "products",
              actions: { read: true }
            },
            {
              resource: "customers",
              actions: {
                read: 'x => x == Query.identity()'
              }
            },
            {
              resource: "orders",
              actions: {
                read: 'x => x.customer == Query.identity()'
              }
            }
          ]
        })
      }
    `);
    console.log(res.data);
  } catch(e) {
    console.log(e)
  }
}

await setupCollection("customers", customers);
await setupCollection("stores", stores);
await setupCollection("products", products);
await setupCollection("orders", orders);
await setupRoles();

client.close();

