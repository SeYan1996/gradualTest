import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
@ObjectType()
export class ChannelMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @Field(() => ID)
  userId: Types.ObjectId;

  @Prop()
  @Field()
  joinedAt: Date;
}

export const ChannelMemberSchema = SchemaFactory.createForClass(ChannelMember);

@ObjectType()
export class ChannelMemberInfo {
  @Field(() => String)
  _id: string;

  @Field({ nullable: true, description: 'userName' })
  userName: string;

  @Field({ nullable: true, description: 'avatar' })
  avatar?: string;
}
