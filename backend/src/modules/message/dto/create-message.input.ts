import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsString, Length, ValidateNested } from 'class-validator';
import { MsgType } from '../const/msg.enum';
import { Type } from 'class-transformer';

@InputType()
class MsgContentInput {
  @Field({ nullable: true, description: '文本内容' })
  text?: string;

  @Field({ nullable: true, description: '图片链接' })
  imgUrl?: string;

  @Field({ nullable: true, description: '文件链接' })
  file?: string;
}

@InputType()
export class SendMessageInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24, { message: 'must be a 24 character string' })
  channelId: string;

  @Field(() => String, { description: '发送者Id' })
  @IsString()
  @Length(24, 24, { message: 'must be a 24 character string' })
  from: string;

  @Field(() => [String], { description: '提及用户Id列表', nullable: true })
  @IsString({ each: true })
  mentionUserIdList?: Array<string>;

  @Field(() => String, { description: '回复消息Id ', nullable: true })
  @IsString()
  @Length(24, 24, { message: 'must be a 24 character string' })
  replyMsgId?: string;

  @Field(() => MsgType)
  @IsEnum(MsgType)
  type: MsgType;

  @Field(() => MsgContentInput)
  @ValidateNested()
  @Type(() => MsgContentInput)
  content: MsgContentInput;
}
