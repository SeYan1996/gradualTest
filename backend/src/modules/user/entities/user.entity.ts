import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@/common/mongo/base.entity';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { UserChannelInfo, UserChannelInfoSchema } from './userChannel.entity';
import { Channel } from '@/modules/channel/entities/channel.entity';

@Schema()
@ObjectType()
export class User extends BaseEntity {
  @Prop()
  @Field({ nullable: true, description: 'userName' })
  userName: string;

  @Prop()
  @Field({ nullable: true, description: 'avatar' })
  avatar?: string;

  @Field(() => [UserChannelInfo], { nullable: true })
  @Prop(
    raw({
      type: Map,
      of: UserChannelInfoSchema,
    }),
  )
  channelMap: Map<string, UserChannelInfo>;
}

export const UserSchema = SchemaFactory.createForClass(User);
