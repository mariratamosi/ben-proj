import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  orm.getMigrator().up();
  console.log("yee2");

  const app = express();
  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(4000, () => {
    console.log("http://localhost:4000");
  });
  // const post = orm.em.create(Post, { title: "first post3" });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

console.log("hello oear");
main().catch((err) => {
  console.log(err);
});
