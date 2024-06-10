import { Module, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { SSEController } from './sse.controler';
import { SSEService } from './sse.service';
import { ChannelService } from '../channel/channel.service';
import { ChannelModule } from '../channel/channel.module';
import { Channel, ChannelSchema } from '../channel/entities/channel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
    forwardRef(() => ChannelModule),
  ],
  controllers: [SSEController],
  providers: [MessageResolver, MessageService, SSEService, ChannelService],
})
export class MessageModule {}
