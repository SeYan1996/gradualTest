import { BaseEntity } from '@/common/mongo/base.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ChannelMember, ChannelMemberSchema } from './member.entity';

@Schema()
@ObjectType('Channel')
export class Channel extends BaseEntity {
  @Prop()
  @Field({ nullable: true, description: '频道名称' })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Message', required: false })
  @Field(() => ID)
  lastMsgId?: Types.ObjectId;

  @Prop({ type: [ChannelMemberSchema] })
  @Field(() => [ChannelMember])
  members: ChannelMember[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
