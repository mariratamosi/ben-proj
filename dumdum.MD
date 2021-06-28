## ts-->js: (typescript with node setup)

===============================

1.  ts-node (slow)
2.  "watch": "tsc -w",
    "start": "node dist/index.js",
    (faster)

3.  "dev": "nodemon dist/index.js",
    (watch the changes and recompile )

            *yarn watch :: will keep watch and compile ts-->js*
            *yarn dev:: whenever js changes, it will run the program*

## Mikro-ORM (db as postgresql, mikro-orm as ORM)

================================

- have a config
- create the em obj
- use it to manipulate the db
  use it to migrate db (being consistent) (need another )

* object–relational mapping (ORM)
* 1234 - postgresql
  createdb -h localhost -p 5432 -U postgres lireddit

https://mikro-orm.io/docs/defining-entities

Create table:: migrations::  
 https://mikro-orm.io/docs/installation/#setting-up-the-commandline-tool

    mikro-orm.config.ts --> all config (migration and db connection)
    npx mikro-orm migration:create:: will create migrations.ts file
            (from mikro-orm.config.ts file configurations).. which will be executed

## graphql endpoint with apollo-express-server

================================

yarn add express
yarn add apollo-server-express
yarn add graphql
yarn add type-graphql
yarn add @types/express

graphql endpoint with apollo-express-server

if arguments never user, make it function(\_, something_else) (best practice)

- express creates a endpoint (localhost:4000)
- apollo-server-express connect between

URL Routes vs GraphQL Schema
both REST and GraphQL APIs are just fancy ways to call functions over a network.
instead of having multiple “dumb” endpoints, have a single “smart” endpoint that can take in complex queries, and then massage the data output into whatever shape the client requires.

\*\*https://medium.com/free-code-camp/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf
a GraphQL API is organized around three main building blocks:

1.  the schema,
2.  queries, and
3.  resolvers: your GraphQL server won’t know what to do with an
    incoming query unless you tell it using a resolver.
    As you’ve seen you can write any code you want inside a resolver.
    Which is why you can also make them modify the contents of
    your database, in which case they’re known as mutation resolvers.

        ** GraphQL is a specification, meaning you can use GraphQL implementations without running a single line of code written by Facebook.

        for private property in entity, remove the @field

Mikro-orm+Apollo+GraphQL

GraphQL:
queries: for getting data
mutation: for update/inserting data

![WhatsApp Image 2021-06-27 at 05 09 30](https://user-images.githubusercontent.com/31970636/123528046-72290a80-d706-11eb-831b-f02f852bb4f2.jpeg)

## Register: Authentication

================================

- Add entity
- Add to DB: by script
  migration.ts:::
  if it's match with current db,
  if not, runs the sql commands

## Session

================================

- store cookie, session, token in browser
- where to store? Redis cause it's fast
  (you can choose any db, eg: postgresql)

\*REDIS:
https://divyanshushekhar.com/how-to-install-redis-on-windows-10/
install msi
run cli from zip extracted files

Middleware: connect-redis

**_ SET graphQL settings "request.credentials": "include",
_** yarn watch
\*\*\* yarn dev
-\_-

### How session works?

##### 1

In redis
session::key ---> {userId: 1}

##### 2

express-session set cookie as _encrypt(session::key)_

##### 3

this cookie is sent with each req from browser

##### 4

Server dycript the cookie _decrypt(encrypt(session::key))_ using the secret in app.use(session...)

##### 5

If needed server makes request to Redis
