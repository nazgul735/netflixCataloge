import { ObjectType, Field, Int } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { MovieClass } from "./Movie"
import { UserClass } from "./User"

@ObjectType()
export class ReviewData {

  @prop({ type: Number })
  @Field(_ => Int!)
  public rating: number

  @prop({ type: String })
  @Field(_ => String!)
  public review: string

  // Create relation with movie
  @prop({ type: String })
  @Field(_ => MovieClass)
  public movieID: Ref<MovieClass>

}

@ObjectType()
export class ReviewClass extends ReviewData {

  @prop({ type: String })
  @Field(_ => String!)
  public username: string

  // Create relation with user
  @prop({ type: String })
  @Field(_ => UserClass)
  public userID: Ref<UserClass>

  @prop({ type: String })
  @Field(_ => String!)
  createdAt: String
}

@ObjectType()
export class ReviewQueryByMovieID {

  @Field(_ => MovieClass)
  public movieID: Ref<MovieClass>

}
export const Review = getModelForClass(ReviewClass);
