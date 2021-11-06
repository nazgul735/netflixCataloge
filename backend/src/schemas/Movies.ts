import { InputType, ObjectType, Field, Int } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { ReviewClass } from "./Reviews"

//export (_type: any) MovieQuery = MovieQueryByID | MovieQueryBySearch;

@ObjectType()
export class MovieQueryByID {

  @Field((_type: any) => MovieClass)
  public movieID!: Ref<MovieClass>;

}


@ObjectType({description: "Movie"})
export class MovieQueryBySearch {

  @prop({ type: String })
  @Field(() => String)
  public title!: string;

  @prop({ type: String })
  @Field(() => String)
  public genre!: string;

  @prop({ type: Number })
  @Field(() => Int)
  public fromYear!: number;

  @prop({ type: Number })
  @Field(() => Int)
  public toYear!: number;

  @prop({ type: Number })
  @Field(() => Int!)
  public limit!: number;

  @prop({ type: Number })
  @Field(() => Int!)
  public offset!: number;
}



@ObjectType()
export class MovieClass {

  @prop({ type: String })
  @Field((_type: any) => String!)
  public movieID!: string;

  @prop({ type: String })
  @Field((_type: any) => String!)
  public title!: string;

  @prop({ type: Number })
  @Field((_type: any) => Int!)
  public year!: number;

  @prop({ type: String })
  @Field((_type: any) => [String]!)
  public genres!: string[];

  @prop({ type: String })
  @Field((_type: any) => [String]!)
  public actors!: string[];

  @prop({ type: String })
  @Field((_type: any) => String)
  public posterUrl? : string

  @prop({ type: String })
  @Field((_type: any) => String)
  public storyline!: string;

  @prop({ type: [ReviewClass] })
  @Field((_type: any) => ReviewClass)
  public reviews!: Ref<ReviewClass>[];
}

@ObjectType()
export class MovieResponse {

  @Field(() => [MovieClass])
  public movies!: MovieClass[];

  @Field(() => Int!)
  public pages!: number;

}

export const Movie = getModelForClass(MovieClass);
