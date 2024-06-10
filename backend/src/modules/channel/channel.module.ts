import { Module, forwardRef } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './entities/channel.entity';
import { ChannelLoader } from './channel.loader';
import { UserModule } from '@module/user/user.module';
import { UserService } from '@module/user/user.service';
import { User, UserSchema } from '@module/user/entities/user.entity';
import { MessageModule } from '../message/message.module';
import { Message, MessageSchema } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';
import { SSEService } from '../message/sse.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => MessageModule),
  ],
  providers: [
    ChannelResolver,
    ChannelService,
    ChannelLoader,
    UserService,
    MessageService,
    SSEService,
  ],
  exports: [ChannelLoader, UserService],
})
export class ChannelModule {}
