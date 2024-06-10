import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { SendMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { FetchMsgInput } from './dto/message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  /**
   * 发送消息
   * @param sendMessageInput
   * @returns
   */
  @Mutation(() => Boolean)
  async sendMessage(
    @Args('sendMessageInput') sendMessageInput: SendMessageInput,
  ) {
    // 时间关系 省略用户及所在频道校验
    await this.messageService.create(sendMessageInput);
    return true;
  }

  /**
   * 拉取频道消息
   * @param fetchMsgInput
   * @returns
   */
  @Query(() => [Message], { name: 'fetchMessages' })
  async fetchMessages(@Args('fetchMsgInput') fetchMsgInput: FetchMsgInput) {
    return this.messageService.fetchMessages(fetchMsgInput);
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message)
  async removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.remove(id);
  }
}
