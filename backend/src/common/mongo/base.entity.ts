import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
@ObjectType({ isAbstract: true })
export class BaseEntity extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({ default: Date.now })
  @Field(() => Date)
  createTime: Date;

  @Prop({ default: false })
  @Field(() => Boolean)
  isDeleted: boolean;
}
