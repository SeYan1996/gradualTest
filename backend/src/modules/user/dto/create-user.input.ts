import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class UserLoginInput {
  @Field(() => String, { description: 'userName' })
  @IsString()
  @Length(1, 50, { message: 'UserName length must between 1~50' })
  userName: string;
}
