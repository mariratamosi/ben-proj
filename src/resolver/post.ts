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

  @Mutation(() => Post) //graphql -type
  async updatePost(
    @Arg("id", () => Int) _id: number,
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { _id });

    if (!post) {
      return null;
    }

    if (typeof title != "undefined") {
      post.title = title;
    }

    return post;
  }

  @Mutation(() => Boolean) //graphql -type
  async deletePost(
    @Arg("id", () => Int) _id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    await em.nativeDelete(Post, { _id });
    return true;
  }
}
