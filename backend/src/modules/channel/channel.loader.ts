import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class ChannelLoader {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<Channel>,
  ) {}

  public readonly loader = new DataLoader<string, Channel>(
    async (channelIds: string[]) => {
      const channels = await this.channelModel
        .find({ _id: { $in: channelIds } })
        .exec();
      const channelMap = new Map(
        channels.map((channel) => [channel._id.toString(), channel]),
      );
      return channelIds.map((channelId) => channelMap.get(channelId));
    },
  );
}
