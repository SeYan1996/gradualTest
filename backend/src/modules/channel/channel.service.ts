import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import mongoose, { Model, Types } from 'mongoose';
import { Channel } from './entities/channel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CountUnreadMsgArgs, SearchChannelUserArgs } from './dto/channel.input';
import { UserService } from '@module/user/user.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<Channel>,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async create(createChannelInput: CreateChannelInput) {
    const existModel = await this.channelModel.findOne({
      name: createChannelInput.name,
    });
    if (existModel) {
      throw Error('该频道已存在');
    }

    const createdModel = new this.channelModel({
      name: createChannelInput.name,
      lastMsgId: null,
      members: [],
    });
    await createdModel.save();
    return createdModel;
  }

  async findAll(keyword: string) {
    const regex = new RegExp(keyword, 'i'); // 'i' 表示不区分大小写
    // 执行模糊匹配查询
    return this.channelModel
      .find({ name: { $regex: regex } })
      .limit(50) // 设置理论上线
      .exec();
  }

  async countUnreadMsg(args: CountUnreadMsgArgs) {
    const user = await this.userService.findById(args.userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    const lastReadMsgId = user.channelMap?.get(args.channelId)?.lastReadMsgId;

    const count = await this.messageService.countUnreadMsg(
      args.userId,
      args.channelId,
      lastReadMsgId,
    );
    return count;
  }

  async searchChannelUser(args: SearchChannelUserArgs) {
    const pipeline = [
      // 匹配指定频道的 ChannelMember
      {
        $match: { _id: new Types.ObjectId(args.channelId) },
      },
      // 展开 members 数组
      {
        $unwind: '$members',
      },
      // 关联 User 集合，以获取与 ChannelMember.userId 关联的用户信息
      {
        $lookup: {
          from: 'users', // User 集合的名称
          localField: 'members.userId',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            { $match: { isDeleted: false } },
            { $project: { _id: 1, userName: 1, avatar: 1 } },
          ],
        },
      },
      // 过滤出符合用户名查询条件的结果
      {
        $match: {
          'user.userName': { $regex: args.keyword, $options: 'i' }, // i 选项表示不区分大小写
        },
      },
    ];

    const result = await this.channelModel.aggregate(pipeline).exec();
    const users = result.map((o) => o.user) || [];

    return users.flat();
  }

  async findOne(id: string) {
    return this.channelModel.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async remove(id: string) {
    const existModel = await this.channelModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!existModel) {
      throw Error('该频道不存在');
    }
    existModel.isDeleted = true;
    await existModel.save();
  }
}
