import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import {
  Channel,
  ChannelSchema,
} from '@module/channel/entities/channel.entity';
import { ChannelModule } from '@module/channel/channel.module';
import { ChannelLoader } from '@module/channel/channel.loader';
import { UserChannelResolver } from './userChannel.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
    forwardRef(() => ChannelModule),
  ],
  providers: [UserResolver, UserChannelResolver, UserService, ChannelLoader],
})
export class UserModule {}
