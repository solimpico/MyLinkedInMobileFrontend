import { Component, OnInit } from '@angular/core';
import {Message} from '../../models/message';
import {User} from '../../models/user';
import {ChatService} from '../../services/chat.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  allChats: Message[] = [];
  conversation: Message[] = [];
  newMessage: Message = {} as Message;
  newConvBool = false;
  idUser = parseInt(sessionStorage.getItem('idUser') || '0', 10);
  searchInput = '';
  allUsers: User[] = [];
  backpage = '../../first';
  myUser: User = {} as User;

  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.newConvBool = false;
    this.chatService.getAllChats().subscribe(conversations => {
      this.allChats = conversations;
    });
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
    this.userService.findById(this.idUser).subscribe(user => {
      this.myUser = user;
    });
    setTimeout(() => {
      this.chatService.getAllChats().subscribe(conversations => {
        this.allChats = conversations;
      });
      this.userService.getAllUsers().subscribe(users => {
        this.allUsers = users;
      });
      this.userService.findById(this.idUser).subscribe(user => {
        this.myUser = user;
      });
    },20000);
  }

  orderMessage(message: Message): Message[]{
    let mes = message;
    this.conversation = [];
    while (mes !== undefined){
      this.conversation.push(mes);
      mes = mes.messageDTOList[0];
    }
    return this.conversation;
  }

  findLastMessage(message: Message): number{
    let idFoglia = 0;
    while (message !== undefined){
      idFoglia = message.id;
      message = message.messageDTOList[0];
    }
    return idFoglia;
  }

  addMessage(parentMessage: Message): void {
    let idReceiver: number;
    let idSender: number;

    if (this.idUser !== 0) {
      if (parentMessage.idSender === this.idUser) {
        this.newMessage.idReceiver = parentMessage.idReceiver;
        this.newMessage.idReceiver = parentMessage.idSender;
        this.newMessage.nameSender = parentMessage.nameSender;
        this.newMessage.nameReceiver = parentMessage.nameReceiver;

      } else {
        this.newMessage.idReceiver = parentMessage.idSender;
        this.newMessage.idSender = parentMessage.idReceiver;
        this.newMessage.nameReceiver = parentMessage.nameSender;
        this.newMessage.nameSender = parentMessage.nameReceiver;
      }

      this.newMessage.datetime = new Date();
      this.newMessage.conversationId = this.findLastMessage(parentMessage);
      this.newMessage.messageDTOList = [];
      this.chatService.sendMessage(this.newMessage).subscribe((mess) => {
        this.newMessage = {} as Message;
        this.addMessageToConversation(parentMessage, mess);
      });
    }
  }

  addMessageToConversation(parent: Message, newMessage: Message){
    const last = this.findLastMessage(parent);
    while (parent !== undefined){
      if (parent.id === last){
        parent.messageDTOList = [newMessage];
      }
      parent = parent.messageDTOList[0];
    }
  }

  sendNewMessage(): void{
    let control = false;
    let p: Message = {} as Message;
    this.allChats.forEach(chat => {
      if (chat.idSender === this.newMessage.idReceiver || chat.idReceiver === this.newMessage.idReceiver) {
        control = true;
        p = chat;
      }
    });
    if (control){
      this.addMessage(p);
    } else {
      this.newMessage.idSender = this.idUser;
      this.newMessage.nameSender = this.myUser.name +' '+this.myUser.surname;
      // l'idReceiver ed il message vengono avvalorati direttamente nell' html
      this.newMessage.conversationId = 0;
      this.newMessage.messageDTOList = [];
      this.chatService.sendMessage(this.newMessage).subscribe((mess) => {
        this.newMessage = {} as Message;
        this.allChats.push(mess);
      });
    }

  }

}
