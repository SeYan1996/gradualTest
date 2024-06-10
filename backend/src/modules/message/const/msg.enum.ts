import { registerEnumType } from '@nestjs/graphql';

/**
 * 消息类型
 */
export enum MsgType {
  /** 文本 */
  Text = 1,
  /** 图片 */
  Img,
  /** 文件 */
  File,
}

registerEnumType(MsgType, {
  name: 'MsgType',
});
