import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private messages: { sender: string, content: string }[] = [];

  constructor() {
    this.socket = io(environment.api);
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(message: { sender: string, content: string, userId: number, userName: string, userPhone: string }) {
    this.socket.emit('sendMessage', message);
  }

  clearMessages() {
    this.socket.emit('clearMessages');
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket.on('newMessage', callback);
  }

  onAllMessages(callback: (messages: any[]) => void) {
    this.socket.on('allMessages', callback);
  }

  onMessagesCleared(callback: () => void) {
    this.socket.on('messagesCleared', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
