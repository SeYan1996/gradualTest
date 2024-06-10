import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class MsgContent {
  @Prop({ required: false })
  @Field({ nullable: true, description: '文本内容' })
  text?: string;

  @Prop({ required: false })
  @Field({ nullable: true, description: '图片链接' })
  imgUrl?: string;

  @Prop({ required: false })
  @Field({ nullable: true, description: '文件链接' })
  file?: string;
}

export const MsgContentSchema = SchemaFactory.createForClass(MsgContent);
