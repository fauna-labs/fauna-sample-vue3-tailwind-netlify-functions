# fauna-sample-vue3-tailwind-netlify-functions
A sample e-commerce app using vue-3 and tailwindcss for the front end, and Netlify functions + Fauna for the back end. We showcase:
* Fauna's document-relational model
* **No servers!** Leverage Netlify functions to deploy server-side code/API endpoints. 
* No servers, no operational overhead, manage everything – front and back-end – in one project.


![demo](/doc/images/vue-fauna-use-demo-data.gif)

## Prerequisites
* Node 16 or above
  > If you have a different version of Node installed on your machine, you can install [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) instead. Tip: You need to uninstall Node first before installing nvm.
* [Netlify Cli](https://www.netlify.com/products/cli/)


  ```
  npm install netlify-cli -g
  ```

## Setup

### Fauna Setup
Signup for a free Fauna account (if you haven't already done so) and simply create a database. For a 
step by step guide, follow [the quick start](https://docs.fauna.com/fauna/current/learn/quick_start/client_quick_start?lang=javascript#prerequisites) instructions to [Create a database](https://docs.fauna.com/fauna/current/get_started/client_quick_start?lang=javascript#create-a-database) and [Get a database access token](https://docs.fauna.com/fauna/current/get_started/client_quick_start?lang=javascript#get-a-database-access-token).

### Project Setup
* Create a file `.env` in the root of this project and populate it with the FAUNA_SECRET database access token obtained from the above steps. e.g.
  ```
  FAUNA_SECRET={{secret}}
  ```

* Install packages
  ```
  npm install
  ```

* Run setup script to populate database resources and sample data:
  ```
  npm run fauna-setup
  ```

## Netlify Dev
```
netlify dev
```

The sample data loads 3 user logins, which you can use to login into the app. The 3 usernames are: "alice.appleseed", "bob.brown" and "carol.clark" and the password is "fauna-demo"
![signin](/doc/images/signin-demo.png)