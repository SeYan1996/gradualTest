import { Channel } from '@/modules/channel/entities/channel.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

/**
 * 用户频道信息
 */
@Schema()
@ObjectType()
export class UserChannelInfo {
  @Prop()
  @Field({ nullable: false, description: '频道ID' })
  channelId?: string;

  @Prop()
  @Field({ nullable: true, description: '最后一次读取的消息ID' })
  lastReadMsgId?: string;

  @Prop({ default: false, defaultOptions: '是否被提及' })
  @Field(() => Boolean)
  mentioned: boolean;

  @Prop()
  @Field({ nullable: true })
  joinedAt?: Date;

  @Field(() => Channel, { nullable: true })
  userChannelDetail?: Channel;
}

export const UserChannelInfoSchema =
  SchemaFactory.createForClass(UserChannelInfo);
