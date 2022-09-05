# vue-fauna-use-demo-data

## Prerequisites
* Node 14
  > If you have a different version of Node installed on your machine. Uninstall it and use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)
* [Netlify Cli](https://www.netlify.com/products/cli/): `npm install netlify-cli -g`

## Project setup

* Create a Fauna database and choose **use demo data**


* Create a `.env` file in the root of this project with the following
```
FAUNA_KEY=secret
FAUNA_DOMAIN=db.{region}.fauna.com
```

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