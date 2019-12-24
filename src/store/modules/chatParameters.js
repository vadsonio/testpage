import chatUsers from '../../FakeJson/chat/ChatUsers';
import chatMessages from '../../FakeJson/chat/ChatMessages';

import Vue from 'vue';

export default {
  actions:{
    setUsers(context){
      context.commit('setUsersMutation', chatUsers.users);
    },
    setMessages(context){
      context.commit('setMessagesMutation', chatMessages.messages);
    },
    addMessage(context, newMessage){
      context.commit('addMessageMutation', newMessage);
    }
  },
  mutations:{
    setUsersMutation(state, users){
      state.chatUsers = users;
    },
    setMessagesMutation(state, messages){
      state.chatMessages = messages;
    },
    setChatByIdMutation(state, chatId){
      state.chatById = _.filter(state.chatMessages, function(item){
        if(item.chatNumb == chatId){
          return true;
        } else {
          return false;
        }
      })
    },
    addMessageMutation(state, newMessage){
      state.chatMessages.push(newMessage);
    }
  },
  state:{
    chatUsers: [],
    chatMessages: [],
    chatById: []
  },
  getters:{
    getUsers(state){
      return state.chatUsers;
    },
    getMessages(state){
      return state.chatMessages;
    },
    getMessagesByChat(state){
      return state.chatById;
    },
    getUserByChat(state, userId){
      return state.chatUsers.filter(function(user){
        return user.id === userId;
      });
    }
  }
}