import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CountUnreadMsgArgs {
  @Field(() => String, { description: 'UserId' })
  @IsString()
  @Length(24, 24, { message: 'UserId must be a 24 character string' })
  userId: string;

  @Field(() => String, { description: 'channelId' })
  @IsString()
  @Length(24, 24, { message: 'channelId must be a 24 character string' })
  channelId: string;
}

@InputType()
export class SearchChannelUserArgs {
  @Field(() => String, { description: 'keyword', nullable: true })
  @IsOptional()
  @IsString()
  keyword?: string;

  @Field(() => String, { description: 'channelId' })
  @IsString()
  @Length(24, 24, { message: 'channelId must be a 24 character string' })
  channelId: string;
}
