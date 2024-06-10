import { Injectable } from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { Message } from './entities/message.entity';

@Injectable()
export class SSEService {
  private userConnections: Map<string, Subject<MessageEvent>> = new Map();

  connectUser(userId: string): Subject<MessageEvent> {
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Subject<MessageEvent>());
    }
    return this.userConnections.get(userId);
  }

  disconnectUser(userId: string) {
    if (this.userConnections.has(userId)) {
      this.userConnections.get(userId).complete();
      this.userConnections.delete(userId);
    }
  }

  sendMessageToUser(userId: string, message: Message) {
    if (this.userConnections.has(userId)) {
      this.userConnections.get(userId).next({ data: message });
    }
  }

  getMessages(userId: string): Observable<MessageEvent> {
    return this.connectUser(userId).asObservable();
  }
}
