import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserLoginInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserChannelInfo } from './entities/userChannel.entity';
import { ChannelLastReadMsgArgs, UserJoinChannelArgs } from './dto/user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建或者登录
   * @param userLoginInput
   * @returns
   */
  @Mutation(() => User)
  async userLogin(@Args('userLoginInput') userLoginInput: UserLoginInput) {
    return this.userService.login(userLoginInput);
  }

  /**
   * 加入聊天频道
   * @param args
   * @returns
   */
  @Mutation(() => UserChannelInfo)
  async joinChannel(
    @Args() args: UserJoinChannelArgs,
  ): Promise<UserChannelInfo> {
    return this.userService.joinChannel(args);
  }

  /**
   * 退出聊天频道
   * @param args
   * @returns
   */
  @Mutation(() => Boolean)
  async quitChannel(@Args() args: UserJoinChannelArgs): Promise<Boolean> {
    await this.userService.quitChannel(args);
    return true;
  }

  /**
   * 更新频道最后已读消息id
   * @param args
   * @returns
   */
  @Mutation(() => Boolean)
  async updateChannelLastReadMsgId(
    @Args() args: ChannelLastReadMsgArgs,
  ): Promise<Boolean> {
    await this.userService.updateChannelLastReadMsgId(args);
    return true;
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findById(id);
  }
}
