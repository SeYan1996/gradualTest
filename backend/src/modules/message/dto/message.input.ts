import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, Length, Max } from 'class-validator';

@InputType()
export class FetchMsgInput {
  @Field(() => String, {
    description: '开始查询的消息Id 为空时查询最新消息',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Length(24, 24, { message: 'startMsgId must be a 24 character string' })
  startMsgId?: string;

  @Field(() => Int, { defaultValue: 50 })
  @Max(500)
  pageSize: number;

  @Field(() => String, { description: 'channelId' })
  @IsString()
  @Length(24, 24, { message: 'channelId must be a 24 character string' })
  channelId: string;

  @Field(() => String, { description: 'userId' })
  @IsString()
  @Length(24, 24, { message: 'userId must be a 24 character string' })
  userId: string;
}
