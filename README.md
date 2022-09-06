# vue-fauna-use-demo-data
Fauna provides an onboarding tutorial for new users to get familiar with core features of the product. To get
started, follow along the [quick start guide](https://docs.fauna.com/fauna/current/learn/quick_start/quick_start).
You would be creating a database with some **Demo data** as part of the guide. 

To supplement the tutorial/guide, we've provided this project, built on top of the **Demo data**, which
provides you a sample of how to work with the database using Vue and Netlify.

![demo](/images/vue-fauna-use-demo-data.gif)

## Prerequisites
* Node 14
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
  FAUNA_DOMAIN={{db.fauna.com}}
  ```
  For `FAUNA_KEY`, use the access key value obtained from step 3 of the Fauna Setup. 
  For `FAUNA_DOMAIN`, please follow **Step 4** in these
  [instructions](https://docs.fauna.com/fauna/current/learn/understanding/region_groups#how-to-use-region-groups)
  if you created your database in a region group other than `Classic`.


* Install packages
  ```
  npm install
  ```

* Run additional setup on the environment (create additional resources, populate more data, etc.)
  ```
  npm run fauna-setup.js
  ```

## Netlify Dev
```
netlify dev
```