import { UserIdArgs } from './dto/user.input';
import { ChannelLoader } from '@module/channel/channel.loader';
import { Channel } from '@module/channel/entities/channel.entity';
import { UserChannelInfo } from './entities/userChannel.entity';
import { UserService } from './user.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => UserChannelInfo)
export class UserChannelResolver {
  constructor(
    private readonly userService: UserService,
    private readonly channelLoader: ChannelLoader,
  ) {}

  @Query(() => [UserChannelInfo], { name: 'userChannels' })
  async userChannels(
    @Args() userIdArgs: UserIdArgs,
  ): Promise<Array<UserChannelInfo>> {
    const data = await this.userService.getChannelMap(userIdArgs.userId);
    // 将 Map 转换为数组
    const dataArr = Array.from(data.values());
    return dataArr;
  }

  @ResolveField('userChannelDetail', () => Channel)
  async userChannelDetail(@Parent() userChannelInfo: UserChannelInfo) {
    const { channelId } = userChannelInfo;
    return this.channelLoader.loader.load(channelId);
  }
}
