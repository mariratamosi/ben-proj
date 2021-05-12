import { Post } from "../entities/Post";
import { User } from "../entities/User";
import {
  Resolver,
  Arg,
  Field,
  InputType,
  Mutation,
  Ctx,
  Query,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  error: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => User) //graphql -type
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);

    return user;
  }

  @Mutation(() => UserResponse) //graphql -type
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse | null> {
    const user = await em.findOne(User, { username: options.username });

    if (!user) {
      return {
        errors: [
          {
            field: "Username",
            error: "Not found",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "Password",
            error: "Incorrect",
          },
        ],
      };
    }
    return {
      user: user
    }
  
}
