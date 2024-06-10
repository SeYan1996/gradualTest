import { Injectable } from '@nestjs/common';
import { UserLoginInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelLastReadMsgArgs, UserJoinChannelArgs } from './dto/user.input';
import { Channel } from '@module/channel/entities/channel.entity';
import { UserChannelInfo } from './entities/userChannel.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Channel.name)
    private readonly channelModel: Model<Channel>,
  ) {}

  async login(input: UserLoginInput) {
    // 模拟登录 如果用户不存在 则创建一个用户
    const existUser = await this.userModel.findOne({
      userName: input.userName,
    });
    if (existUser) {
      return existUser;
    }

    // 生成一个随机头像
    const randomId = Math.floor(Math.random() * 1000); // Picsum IDs range from 0 to 1000
    const url = `https://picsum.photos/id/${randomId}/300/300`;
    const createdUser = new this.userModel({ ...input, avatar: url });
    await createdUser.save();
    return createdUser;
  }

  /**
   * 获取用户所有频道映射表
   * @param userId
   * @returns
   */
  async getChannelMap(userId: string) {
    const existUser = await this.userModel.findOne({
      _id: userId,
      isDeleted: false,
    });
    if (!existUser) {
      throw Error('用户不存在');
    }
    return existUser.channelMap || new Map();
  }

  /**
   * 加入频道
   * @param args
   * @returns
   */
  async joinChannel(args: UserJoinChannelArgs) {
    const existUser = await this.userModel.findOne({
      _id: args.userId,
      isDeleted: false,
    });
    if (!existUser) {
      throw Error('用户不存在');
    }
    const existChannel = await this.channelModel.findOne({
      _id: args.channelId,
      isDeleted: false,
    });
    if (!existChannel) {
      throw Error('频道不存在');
    }
    existUser.channelMap = existUser.channelMap || new Map();
    if (existUser.channelMap.get(args.channelId)) {
      throw Error('请勿重复加入频道');
    }
    const now = new Date();

    // 更新用户频道信息
    const userChannelInfo: UserChannelInfo = {
      channelId: existChannel._id.toString(),
      lastReadMsgId: null,
      mentioned: false,
      joinedAt: now,
    };
    existUser.channelMap.set(args.channelId, userChannelInfo);
    await existUser.save();
    // 更新频道用户列表
    existChannel.members = existChannel.members || [];
    existChannel.members.push({ userId: existUser._id, joinedAt: now });
    await existChannel.save();
    return userChannelInfo;
  }

  /**
   * 退出频道
   * @param args
   * @returns
   */
  async quitChannel(args: UserJoinChannelArgs) {
    const existUser = await this.userModel.findOne({
      _id: args.userId,
      isDeleted: false,
    });
    if (!existUser) {
      throw Error('用户不存在');
    }
    const existChannel = await this.channelModel.findOne({
      _id: args.channelId,
      isDeleted: false,
    });
    if (!existChannel) {
      throw Error('频道不存在');
    }
    existUser.channelMap = existUser.channelMap || new Map();
    if (!existUser.channelMap.get(args.channelId)) {
      throw Error('未加入频道');
    }

    // 更新用户频道信息
    existUser.channelMap.delete(args.channelId);
    await existUser.save();
    // 更新频道用户列表
    existChannel.members = existChannel.members || [];
    existChannel.members = existChannel.members.filter(
      (member) => member.userId !== existUser._id,
    );
    await existChannel.save();
    return;
  }

  async updateChannelLastReadMsgId(args: ChannelLastReadMsgArgs) {
    const existUser = await this.userModel.findOne({
      _id: args.userId,
      isDeleted: false,
    });
    if (!existUser) {
      throw Error('用户不存在');
    }
    const existChannel = await this.channelModel.findOne({
      _id: args.channelId,
      isDeleted: false,
    });
    if (!existChannel) {
      throw Error('频道不存在');
    }
    existUser.channelMap = existUser.channelMap || new Map();
    if (!existUser.channelMap.get(args.channelId)) {
      throw Error('未加入频道');
    }

    // 更新用户频道lastReadMsgId
    const userChannelInfo = existUser.channelMap.get(args.channelId);
    if (userChannelInfo) {
      userChannelInfo.lastReadMsgId = args.lastReadMsgId;
      existUser.markModified(`channelMap.${args.channelId}`);
      await existUser.save();
    }
  }

  async findById(id: string) {
    return this.userModel.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }
}
