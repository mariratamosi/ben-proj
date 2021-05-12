import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true }) //graphql -type
  post(
    @Arg("identity", () => Int) _id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    //ts type
    return em.findOne(Post, { _id });
  }

  @Mutation(() => Post) //graphql -type
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);

    return post;
  }
}
