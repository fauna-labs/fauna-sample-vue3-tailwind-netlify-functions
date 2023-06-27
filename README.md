# vue-fauna-use-demo-data
Fauna provides an onboarding tutorial for new users to get familiar with core features of the product. To get
started, follow along the [quick start guide](https://docs.fauna.com/fauna/current/learn/quick_start/quick_start).
You would be creating a database with some **Demo data** as part of the guide. 

To supplement the tutorial/guide, we've provided this project, built on top of the **Demo data**, which
provides you a sample of how to work with the database using Vue and Netlify.

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
step by step guide, follow [these](https://docs.fauna.com/fauna/current/learn/quick_start/client_quick_start?lang=javascript#prerequisites)
instructions from steps 1 through 3. 

⚠️ In step 2 above, be sure to check the **Use demo data** checkbox.

### Project Setup
* Create a `.env` file in the root of this project with the following values
  ```
  FAUNA_KEY={{secret}}
  ```
  For the value of `FAUNA_KEY`, use the access key value obtained from step 3 of the Fauna Setup. 


* Install packages
  ```
  npm install
  ```

* Run additional setup on the environment (create additional resources, populate more data, etc.)
  ```
  npm run fauna-setup
  ```

## Netlify Dev
```
netlify dev
```

The sample data loads 3 user logins, which you can use to login into the app. The 3 usernames are: "alice.appleseed", "bob.brown" and "carol.clark" and the password is "fauna-demo"
![signin](/doc/images/signin-demo.png)