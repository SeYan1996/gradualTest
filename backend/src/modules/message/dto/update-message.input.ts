import { SendMessageInput } from './create-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(SendMessageInput) {
  @Field(() => Int)
  id: number;
}
