const faunadb = require('faunadb');
const q = faunadb.query;
const { Select, Map, Paginate, Documents, Collection, Lambda, Let, Get, Var, Merge } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  domain: process.env.FAUNA_DOMAIN
});

exports.handler = async function (event, context) {
  console.log(event.httpMethod);

  if (event.httpMethod === 'GET') {
    let res = await client.query(
      Select(
        ['data'],
        Map(
          Paginate(Documents(Collection('products'))),
          Lambda(
            'x',
            Let(
              {
                doc: Get(Var('x')),
                data: Select(['data'], Var('doc')),
                id: Select(['ref', 'id'], Var('doc'))
              },
              Merge({ id: Var('id') }, Var('data'))
            )
          )
        )
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