import { Controller, Sse, MessageEvent, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SSEService } from './sse.service';

@Controller('message')
export class SSEController {
  constructor(private readonly sseService: SSEService) {}

  /**
   * 建立sse连接
   * @param userId
   * @returns
   */
  @Sse('sse/:userId')
  sse(@Param('userId') userId: string): Observable<MessageEvent> {
    return this.sseService.getMessages(userId);
  }
}
