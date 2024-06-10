import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { CountUnreadMsgArgs, SearchChannelUserArgs } from './dto/channel.input';
import { ChannelMemberInfo } from './entities/member.entity';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  /**
   * 创建频道
   * @param createChannelInput
   * @returns
   */
  @Mutation(() => Channel)
  async createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    return this.channelService.create(createChannelInput);
  }

  /**
   * 查询频道列表 可模糊匹配
   * @param keyword
   * @returns
   */
  @Query(() => [Channel], { name: 'channels' })
  async findAll(@Args('keyword', { type: () => String }) keyword: string) {
    return this.channelService.findAll(keyword);
  }

  /**
   * 查询用户频道未读消息数量 超过100直接返回100 显示99+
   * @param args
   * @returns
   */
  @Query(() => Number, { name: 'countUnreadMsg' })
  async countUnreadMsg(@Args('countUnreadMsgArgs') args: CountUnreadMsgArgs) {
    return this.channelService.countUnreadMsg(args);
  }

  /**
   * 查询频道内用户列表 可模糊匹配 用于'@'时展示选项
   * @param keyword
   * @returns
   */
  @Query(() => [ChannelMemberInfo], { name: 'searchChannelUser' })
  async searchChannelUser(
    @Args('searchChannelUserArgs') args: SearchChannelUserArgs,
  ) {
    return this.channelService.searchChannelUser(args);
  }

  @Query(() => Channel, { name: 'channel' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.channelService.findOne(id);
  }

  @Mutation(() => Channel)
  async removeChannel(@Args('id', { type: () => String }) id: string) {
    return this.channelService.remove(id);
  }
}
