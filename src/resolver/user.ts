import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Resolver, Arg, Field, InputType, Mutation, Ctx } from "type-graphql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Post) //graphql -type
  async createUser(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const user = em.create(User, { username: options.username });
    await em.persistAndFlush(user);

    return user;
  }
}
