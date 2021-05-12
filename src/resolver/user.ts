import { Resolver, Query } from "type-graphql";

@Resolver()
export class UserResolver {
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
