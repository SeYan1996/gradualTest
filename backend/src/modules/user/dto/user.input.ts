import { IsString, Length } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserIdArgs {
  @Field(() => String, { description: 'UserId' })
  @IsString()
  @Length(24, 24, { message: 'UserId must be a 24 character string' })
  userId: string;
}

@ArgsType()
export class UserJoinChannelArgs {
  @Field(() => String, { description: 'UserId' })
  @IsString()
  @Length(24, 24, { message: 'UserId must be a 24 character string' })
  userId: string;

  @Field(() => String, { description: 'channelId' })
  @IsString()
  @Length(24, 24, { message: 'channelId must be a 24 character string' })
  channelId: string;
}

@ArgsType()
export class ChannelLastReadMsgArgs {
  @Field(() => String, { description: 'UserId' })
  @IsString()
  @Length(24, 24, { message: 'UserId must be a 24 character string' })
  userId: string;

  @Field(() => String, { description: 'channelId' })
  @IsString()
  @Length(24, 24, { message: 'channelId must be a 24 character string' })
  channelId: string;

  @Field(() => String, { description: 'lastReadMsgId' })
  @IsString()
  @Length(24, 24, { message: 'lastReadMsgId must be a 24 character string' })
  lastReadMsgId: string;
}
