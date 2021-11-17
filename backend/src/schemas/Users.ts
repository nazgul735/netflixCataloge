import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class UserClass {

  @prop({ type: String })
  @Field(() => String!)
  public username!: string;

  @prop({ type: String })
  @Field(() => String!)
  public password!: string;

  @prop({ type: String })
  @Field(() => String!)
  public email!: string;

  @prop({ type: String })
  @Field(() => String!)
  public createdAt!: string;

}

@ObjectType()
export class UserRegistration {

  @Field(() => String!)
  public username!: string;

  @Field(() => String!)
  public email!: string;

  @Field(() => String!)
  public password!: string;

  @Field(() => String!)
  public confirmPassword!: string;

}

@ObjectType()
export class UserLogin {

  @Field(() => String!)
  public username!: string;

  @Field(() => String!)
  public password!: string;

}

export const User = getModelForClass(UserClass);
