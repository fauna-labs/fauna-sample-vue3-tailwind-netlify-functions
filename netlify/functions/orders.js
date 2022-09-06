// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const faunadb = require('faunadb');
const q = faunadb.query;
const { CurrentIdentity, If, Paginate, Documents, Collection, Lambda, Map, Let, Get, Var, Merge, Select,
  Ref, Do, Foreach, LTE, Abort, Concat, ToString, Time, Update, Subtract, Create } = q;

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
  domain: process.env.FAUNA_DOMAIN
});

exports.handler = async function (event, context) {
  try {
    const token = event.headers.authorization.split('Bearer ')[1];

    if (event.httpMethod === 'GET') {
      let res = await client.query(
        Map(
          Paginate(Documents(Collection("orders"))),
          Lambda(
            "x",
            Let(
              {
                order: Get(Var("x")),
                cart: Select(["data", "cart"], Var("order")),
                cartProducts: Map(
                  Var('cart'),
                  Lambda(
                    ["item"],
                    {
                      product: Merge(
                        Select(['data'], Get(Select(["product"], Var("item")))),
                        [
                          { id: Select(["product", "id"], Var("item")) },
                          { price: Select(["price"], Var("item")) }
                        ]
                      ),
                      quantity: Select(["quantity"], Var("item"))  
                    }
                  )
                )
              },
              Merge(
                { id: Select(["ref", "id"], Var("order")) },
                [
                  Select(["data"], Var("order")),
                  { cart: Var("cartProducts") }
                ]
              )
            )
          )
        ),
        { secret: token }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };  
    }

    // ----------------
    // SUBMIT ORDER
    // ----------------
    if (event.httpMethod === 'POST') {
      const payload = JSON.parse(event.body);
      const products = payload.products;
      const shippingAddress = payload.shippingAddress;
      const paymentInfo = payload.paymentInfo;
  
      const customer = await client.query(
        CurrentIdentity(),
        { secret: token }
      )

      let res = await client.query(
        Let(
          {
            products: Map(
              products,
              Lambda(
                "p",
                Let(
                  {
                    r: Ref(Collection("products"), Select("productId", Var("p"))),
                    product: Get(Var("r"))
                  },
                  {
                    ref: Var("r"),
                    id: Select(["id"], Var("r")),
                    name: Select(["data", "name"], Var("product")),
                    price: Select(["data", "price"], Var("product")),
                    currentQuantity: Select(["data", "quantity"], Var("product")),
                    requestedQuantity: Select(["quantity"], Var("p")),
                    backorderLimit: Select(["data", "backorderLimit"], Var("product"))
                  }
                )
              )
            )
          },
          Do(
            Foreach(
              Var("products"),
              Lambda(
                "product",
                If(
                  LTE(
                    Select("requestedQuantity", Var("product")),
                    Select("currentQuantity", Var("product"))
                  ),
                  Var("product"),
                  Abort(
                    Concat([
                      "Stock quantity for Product [",
                      Select(["name"], Var("product")),
                      "] not enough"
                    ])
                  )
                )
              )
            ),
            Foreach(
              Var("products"),
              Lambda(
                "product",
                Update(Select("ref", Var("product")), {
                  data: {
                    quantity: Subtract(
                      Select("currentQuantity", Var("product")),
                      Select("requestedQuantity", Var("product"))
                    )
                  }
                })
              )
            ),
            Foreach(
              Var("products"),
              Lambda(
                "product",
                If(
                  LTE(
                    Subtract(
                      Select("currentQuantity", Var("product")),
                      Select("requestedQuantity", Var("product"))
                    ),
                    Select("backorderLimit", Var("product"))
                  ),
                  Update(Select("ref", Var("product")), {
                    data: { backordered: true }
                  }),
                  Var("product")
                )
              )
            ),
            Let(
              {
                shoppingCart: Map(
                  Var("products"),
                  Lambda("product", {
                    product: Select("ref", Var("product")),
                    quantity: Select("requestedQuantity", Var("product")),
                    price: Select("price", Var("product"))
                  })
                )
              },
              Create(Collection("orders"), {
                data: {
                  customer: customer,
                  cart: Var("shoppingCart"),
                  status: "processing",
                  creationDate: Time("now"),
                  shipDate: null,
                  deliveryAddress: shippingAddress,
                  creditCard: paymentInfo
                }
              })
            )
          )
        ),
        { secret: process.env.FAUNA_KEY }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };
    }
  } catch(e) {
    // console.log(`ERROR: ${e.description}`);
    return {
      statusCode: e.description === 'Unauthorized' ? 401 : 400,
      body: JSON.stringify({ error: e.description })
    };
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };

};

