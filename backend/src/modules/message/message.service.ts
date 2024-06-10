import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { SendMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FetchMsgInput } from './dto/message.input';
import { SSEService } from './sse.service';
import { ChannelService } from '@module/channel/channel.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly msgModel: Model<Message>,
    private readonly sseService: SSEService,
    @Inject(forwardRef(() => ChannelService))
    private readonly channelService: ChannelService,
  ) {}

  async create(sendMessageInput: SendMessageInput) {
    // 数据库持久化
    const msgModel = new this.msgModel(sendMessageInput);
    await msgModel.save();
    // 推送用户消息
    const channel = await this.channelService.findOne(
      sendMessageInput.channelId,
    );
    if (channel && channel.members) {
      channel.members.forEach(async (m) => {
        try {
          this.sseService.sendMessageToUser(m.userId.toString(), msgModel);
        } catch (e) {
          // 异常处理
        }
      });
    }
    return;
  }

  async fetchMessages(fetchMsgInput: FetchMsgInput) {
    const { startMsgId, pageSize, channelId, userId } = fetchMsgInput;
    let query = { channelId, from: userId } as any;
    if (startMsgId) {
      const startMsg = await this.msgModel.findById(startMsgId);
      if (startMsg) {
        query._id = { $lt: startMsgId };
      }
    }
    return this.msgModel
      .find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(pageSize)
      .exec();
  }

  async countUnreadMsg(
    userId: string,
    channelId: string,
    lastReadMsgId?: string,
  ) {
    let query = { channelId, from: { $ne: userId } } as any;
    if (lastReadMsgId) {
      const startMsg = await this.msgModel.findById(lastReadMsgId);
      if (startMsg) {
        query._id = { $gt: lastReadMsgId };
      }
    }
    const count = await this.msgModel
      .countDocuments(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(100) // 超过100就不再计算
      .exec();

    return count;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
