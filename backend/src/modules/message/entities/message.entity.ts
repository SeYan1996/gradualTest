import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MsgContent, MsgContentSchema } from './messageContent.entity';
import { MsgType } from '../const/msg.enum';
import { BaseEntity } from '@/common/mongo/base.entity';

@Schema()
@ObjectType()
export class Message extends BaseEntity {
  @Prop({ type: Types.ObjectId, ref: 'Channel', required: true })
  @Field(() => ID)
  channelId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @Field(() => ID, { description: '发送者Id' })
  from: Types.ObjectId;

  @Prop({ type: Array<Types.ObjectId>, required: false })
  @Field(() => [ID], { description: '提及用户Id列表', nullable: true })
  mentionUserIdList?: Array<Types.ObjectId>;

  @Prop({ type: Types.ObjectId, ref: 'Message', required: false })
  @Field(() => ID, { description: '引用的消息Id ', nullable: true })
  replyMsgId?: Types.ObjectId;

  @Prop({ type: Number, enum: MsgType, required: true })
  @Field(() => MsgType)
  type: MsgType;

  @Prop({ type: MsgContentSchema })
  @Field(() => MsgContent)
  content: MsgContent;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
