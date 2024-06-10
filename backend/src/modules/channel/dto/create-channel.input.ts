import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateChannelInput {
  @Field(() => String, { description: 'name' })
  @IsString()
  @Length(1, 50, { message: 'Name length must between 1~50' })
  name: string;
}
