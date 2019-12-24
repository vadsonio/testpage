<template>
  <div class="dialogues__window">
    <!-- head -->
    <div class="dialogues__window-head">
      <div class="dialogues__window-mob-info d-flex justify-content-between align-items-center">
        <div class="dialogues__window-time">
          {{timestamp}}
        </div>
        <div class="dialogues__window-connect-info">
          <ul>
            <li>
              <img width="16px" src="../../../assets/icons/mobile-connection.png" alt="">
            </li>
            <li>
              <img width="16px" src="../../../assets/icons/mobile-wifi.png" alt="">
            </li>
            <li>
              <img width="20px" src="../../../assets/icons/mobile-battery.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="dialogues__window-user-info d-flex justify-content-between align-items-center">
        <div class="dialogues__window-user d-flex align-items-center">
          <div class="dialogues__window-avatar" :style="{backgroundImage: 'url('+ opponent.avatar +')'}"></div>
          <div class="dialogues__window-userprofile">
            <p class="user-name">{{opponent.name}}</p>
            <p v-if="!opponent.myself" class="user-status">{{opponent.status}}</p>
            <p v-else class="user-status">(It`s you)</p>
          </div>
        </div>

        <div class="dialogues__window-connect-info">
          2
        </div>
      </div>
    </div>
    <!-- /head -->

    <!-- body -->
    <div class="dialogues__window-body" ref="messagesBody">
      <div class="dialogues__window-message-field"
           v-for="(message, index) in chatMessages"
           :key="message.id">

        <div class="dialogues__window-avatar"
             v-if="!messageChoose(message.fromUser)"
             :style="{backgroundImage: 'url('+ avatarChoose(message.fromUser) +')'}"></div>

        <div class="dialogues__window-message-list">
          <div class="dialogues__window-message-main"
               :class="{'myMessage': messageChoose(message.fromUser)}">
            <p class="dialogues__window-message"
               :class="{'left': !messageChoose(message.fromUser), 'right': messageChoose(message.fromUser)}">
              <span class="user-name"
                    v-if="messageChoose(message.fromUser)">{{user.name}} (you)<br></span>
              {{message.text}}
            </p>
            <time>{{message.time}}</time>
          </div>
        </div>

      </div>

    </div>
    <!-- /body -->

    <!-- tools -->
    <div class="dialogues__window-tools">
              <textarea
                      ref="messageTextarea"
                      v-model="messageText"
                      placeholder="Type your message..."
                      @input="resize"
                      @keydown.enter.prevent="sendMessage"
              ></textarea>
      <button @click="sendMessage">
        <img src="../../../assets/icons/dialogue-arrow.png" width="22px" alt="">
      </button>

    </div>
    <!-- tools -->
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';

  export default{
    props: ['userId', 'chatNumb'],
    data(){
      return{
        chatNumber: this.chatNumb,
        userIdent: this.userId,
        myself: false,
        messageText: "",
        messageObject: {
          chatNumb: this.chatNumb,
          fromUser: "",
          messageInChat: 0,
          userOneId: "",
          userTwoId: "",
          time: "",
          text: ""
        },
        user: {
          name: "",
          status: "",
          id: "",
          avatar: "",
          myself: false
        },
        opponent: {
          name: "",
          status: "",
          id: "",
          avatar: ""
        },
        messages: [],
        timestamp: ""
      }
    },
    methods:{
      ...mapActions(['setUsers', 'setMessages', 'addMessage']),
      ...mapMutations(['setChatByIdMutation', 'setUserByChatIdMutation']),
      enableTextAreaAutosize(){
        // this.$refs.messageTextarea.addEventListener("input", this.resize);
      },
      resize($event){
        // поле для ввода сообщения(textarea)
        $event.target.style.height = "auto";
        $event.target.style.height = `${$event.target.scrollHeight+5}px`;
      },
      sendMessage(e){
        //для передачи уникального сообщения в state
        let message = {
          chatNumb: this.chatNumber,
          messageInChat: this.getMessages.length+1,
          userOneId: this.user.id,
          userTwoId: this.opponent.id,
          fromUser: this.user.id,
          time: this.timestamp,
          text: this.messageText
        };

        if(message.text.length>0){
          this.addMessage(message);
          setTimeout(() => this.setChatByIdMutation(this.chatNumber), 1000);
          this.messageText = "";
        } else{
          this.messageText = "";
          return false;
        }

      },
      currentUser(){
        let user = this.getUsers.find(user => user.id === this.userId);
        this.user.name = user.name;
        this.user.status = user.status;
        this.user.id = user.id;
        this.user.avatar = user.avatar;
        this.user.myself = user.myself;
      },
      selectUsers(element){
        if(element.userOneId === this.user.id){
          this.opponent.id = element.userTwoId;
        } else {
          this.opponent.id = element.userOneId;
        }
      },
      opponentUser(){
        this.getMessagesByChat.find(this.selectUsers);

        let opponent = this.getUsers.find(user => user.id === this.opponent.id);
        this.opponent.name = opponent.name;
        this.opponent.status = opponent.status;
        this.opponent.id = opponent.id;
        this.opponent.avatar = opponent.avatar;
      },
      avatarChoose(id){
        if(this.user.id === id){
          this.user.myself = true;
          return this.user.avatar;
        } else if(this.opponent.id === id){
          return this.opponent.avatar;
        }
      },
      messageChoose(id){
        if(this.user.id === id){
          return true;
        } else{
          return false;
        }
      },
      getTimestamp(){
        let today = new Date(),
            time = `${today.getHours()}:${today.getMinutes()}`;
        this.timestamp = time;
      }
    },
    created(){
      this.setUsers();
      setInterval(this.getTimestamp, 1000);
    },
    updated(){
      // скролл спускаем вниз
      let messagesBody = this.$refs.messagesBody;
      messagesBody.scrollTop = messagesBody.scrollHeight - messagesBody.clientHeight;
    },
    mounted(){
      this.setMessages();
      this.setChatByIdMutation(this.chatNumber);
      this.enableTextAreaAutosize();
      this.currentUser();
      this.opponentUser();
    },
    computed:{
      ...mapGetters(['getUsers','getMessages','getMessagesByChat', 'getUserByChat']),
      chatMessages(){
        return this.$store.getters.getMessagesByChat;
      }
    },
    watch: {

    }
  }
</script>

<style lang="scss">
  .dialogues{
    margin: 40px auto 50px;
    &__row{
      display: flex;
    }
    &__column{
      padding: 10px;
      width: 50%;
    }
    &__window{
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      max-width: 380px;
      -webkit-box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      &-connect-info{
        li{
          display: inline-block;
          margin-right: 5px;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      &-head{
        position: relative;
        padding: 10px 20px;
        -webkit-box-shadow: 0px 0px 5px rgba(0,0,0,.4);
        -moz-box-shadow: 0px 0px 5px rgba(0,0,0,.4);
        box-shadow: 0px 0px 5px rgba(0,0,0,.4);
      }
      &-mob-info{
        margin-bottom: 20px;
      }
      &-time{
        margin-left: 15px;
        font-size: 14px;
      }
      &-avatar{
        margin-right: 10px;
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        background-color: #999;
        background-image: url("https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg");
        background-position: center;
        background-size: contain;
      }
      &-userprofile{
        .user-name{
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 600;
        }
        .user-status{
          margin-bottom: 0;
          font-size: 12px;
          color: #999;
        }
      }
      &-body{
        padding: 20px 15px;
        height: 300px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track {
          /*box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);*/
        }
        &::-webkit-scrollbar-thumb {
          background-color: #4DB9FD;
          outline: 1px solid #4DB9FD;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          opacity: .5;
        }
      }
      &-message-field{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &.myself{
          justify-content: flex-end;
        }
      }
      &-message-list{
        width: 100%;
      }
      &-message{
        position: relative;
        padding: 10px;
        margin-bottom: 0;
        word-break: break-word;
        flex-shrink: 0;
        width: 80%;
        font-size: 13px;
        border-radius: 10px;
        -webkit-animation: fadeInMessage 0.3s;
        animation: fadeInMessage 0.3s;
        .user-name{
          font-size: 12px;
          font-weight: 600;
        }
        &.left{
          padding-left: 20px;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 20px;
          color: #525252;
          background: #DCE6EE;
        }
        &.right{
          padding-right: 20px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 20px;
          color: #fff;
          background: rgb(3,144,250); /* Old browsers */
          background: -moz-linear-gradient(-45deg, rgba(3,144,250,1) 0%, rgba(165,232,255,1) 100%); /* FF3.6-15 */
          background: -webkit-linear-gradient(-45deg, rgba(3,144,250,1) 0%,rgba(165,232,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(135deg, rgba(3,144,250,1) 0%,rgba(165,232,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0390fa', endColorstr='#a5e8ff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        }
      }
      &-message-main{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        &.myMessage{
          flex-direction: row-reverse;
        }
        time{
          margin-bottom: 5px;
          font-size: 12px;
          color: #999;
          font-weight: 500;
        }
      }
      &-tools{
        padding-bottom: 10px;
        display: flex;
        align-items: flex-end;
        border-top: 1px solid #eee;
        background: #F9FBFC;
        textarea{
          padding: 10px 15px 0;
          flex-grow: 1;
          resize: none;
          max-height: 100px;
          outline: none;
          border: none;
          background: transparent;
          &::-webkit-scrollbar {
            width: 0px;  /* Remove scrollbar space */
            background: transparent;  /* Optional: just make scrollbar invisible */
          }
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #8C95A5;
          }
          &:-moz-placeholder { /* Firefox 18- */
            font-size: 14px;
            color: #8C95A5;
          }
          &::-moz-placeholder {  /* Firefox 19+ */
            font-size: 14px;
            color: #8C95A5;
          }
          &:-ms-input-placeholder {
            font-size: 14px;
            color: #8C95A5;
          }
          &::placeholder {
            font-size: 14px;
            color: #8C95A5;
          }
        }
        button{
          margin-right: 10px;
          height: 40px;
          width: 40px;
          border: none;
          border-radius: 50%;
          -webkit-transition: .2s;
          -moz-transition: .2s;
          -ms-transition: .2s;
          -o-transition: .2s;
          transition: .2s;
          outline: none;
          background: #4DB9FD;
          &:hover{
            opacity: .8;
          }
          &:active{
            opacity: .6;
          }
        }
      }
    }
  }
  /* Animation steps */

  @-webkit-keyframes fadeInMessage {
    0% {
      transform: scale(1.1);
      opacity: 0.0;
    }
    90%{
      transform: scale(.8);
    }
    100% {
      transform: scale(1);
      opacity: 1.0;
    }
  }

  @keyframes fadeInMessage {
    0% {
      transform: scale(1.1);
      opacity: 0.0;
    }
    90%{
      transform: scale(.8);
    }
    100% {
      transform: scale(1);
      opacity: 1.0;
    }
  }
</style>