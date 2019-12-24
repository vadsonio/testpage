<template>
  <div class="modal modal--custom modal-sale" v-if="showModal && !isMobile">

    <transition name="enableModal">
      <div v-if="showModalInner" class="modal__inner d-flex" v-click-outside="hide">
        <div class="modal__part left">
          <div class="modal__adv">

            <div class="modal__adv-top">
              <p class="modal__adv-time">summer</p>
              <p class="modal__adv-sale">sale</p>
            </div>

            <div class="modal__adv-body">
              <p class="modal__adv-action">
                save up to
              </p>
              <div class="modal__adv-percent-block d-flex align-items-center justify-content-center">
                <span class="modal__adv-percent">
                  30
                </span>
                <p class="d-flex flex-column mb-0">
                  <span class="modal__adv-percent-symb">%</span>
                  <span class="modal__adv-percent-frase">off</span>
                </p>
              </div>
              <p class="modal__adv-after">
                in stores & online
              </p>
            </div>
          </div>
        </div>
        <div class="modal__part right">
          <span class="modal__close" @click="showModal=false">×</span>
          <h2 class="modal__main-title">
            enter your email below, to unlock
          </h2>
          <p class="modal__main-subtitle">
            where should we send your 30% off?
          </p>
          <input type="email" v-model="inputMain" class="modal__main-input" placeholder="Enter your email here">
          <button class="modal__main-submit">get my $10 off</button>
          <a href="" class="modal__main-skip" @click.prevent="showModal=false">
            no, thanks
          </a>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import Vue from 'vue';

  let hideModal;
  Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      hideModal = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', hideModal)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', hideModal)
    }
  });

  export default {
    data(){
      return{
        inputMain: "",
        showModal: false,
        showModalInner: false,
        isMobile: false
      }
    },
    methods:{
      enableModal(){
        if(this.isMobile){
          return false;
        } else{
          setTimeout(()=>{
            this.showModal = true;
            setTimeout(()=>this.showModalInner = true, 100);
          }, 3000);
        }
      },
      hide(){
        this.showModal = false;
      },
      detectDevice(){
        // if(window.innerWidth <= 800 && window.innerHeight <= 600) {
        if(window.innerWidth <= 800) {
          console.log('device is mobile');
          this.isMobile = true;
          return true;
        } else {
          console.log('device is desktop');
          this.isMobile = false;
          return false;
        }
      }
    },
    watch:{
      showModal(newVal){
        newVal===true ? document.body.classList.add("modal-open") : document.body.classList.remove("modal-open")
      }
    },
    mounted(){
      this.detectDevice();
      this.enableModal();
    }
  }
</script>

<style lang="scss">
  .modal{
    &--custom{
      display: block;
      background: rgba(0,0,0,.7);
    }
    &__inner{
      position: absolute;
      @include absVertHorCenter;
    }
    &__part{
      padding: 35px 20px;
      text-align: center;
      &.left{
        background: #202a36;
      }
      &.right{
        padding: 35px 45px;
        position: relative;
        color: #333;
        background: #fff;
      }
    }
    &__close{
      position: absolute;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      top: -15px;
      right: -15px;
      line-height: 1;
      font-size: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      background: #fff;
      -webkit-transition: .3s;
      -moz-transition: .3s;
      -ms-transition: .3s;
      -o-transition: .3s;
      transition: .3s;
    }
    &__main-title{
      font-size: 14px;
      text-transform: uppercase;
    }
    &__main-subtitle{
      margin-bottom: 40px;
      font-size: 20px;
      color: #3CB371;
    }
    &__main-input{
      padding: 8px 15px;
      margin-bottom: 10px;
      display: block;
      width: 100%;
      border: none;
      outline: none;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      background: #F0F0F0;
      &::-webkit-input-placeholder {
        text-align: center;
        font-size: 15px;
        color: #999;
      }
      &:-moz-placeholder { /* Firefox 18- */
        text-align: center;
        font-size: 15px;
        color: #999;
      }
      &::-moz-placeholder {  /* Firefox 19+ */
        text-align: center;
        font-size: 15px;
        color: #999;
      }
      &:-ms-input-placeholder {
        text-align: center;
        font-size: 15px;
        color: #999;
      }
    }
    &__main-submit{
      padding: 8px 15px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border: none;
      border-radius: 4px;
      font-size: 15px;
      text-transform: uppercase;
      outline: none;
      color: #fff;
      background: #FF6161;
      &:hover{
        opacity: .8;
      }
      &:active{
        opacity: .6;
      }
    }
    &__main-skip{
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      text-decoration: underline;
      color: #777;
      &:hover{
        opacity: .8;
        color: #777;
      }
      &:active{
        opacity: .6;
      }
    }
    .modal__adv{
      display: flex;
      flex-direction: column;
      font-family: 'Roboto Condensed', sans-serif;
      color: #FF6161;
      &-top{
        margin-bottom: 30px;
      }
      &-time{
        margin-bottom: 0;
        font-size: 30px;
        text-transform: uppercase;
        letter-spacing: -2px;
        line-height: 1;
        font-family: 'Roboto Condensed', sans-serif;
      }
      &-sale{
        margin-bottom: 0;
        font-size: 53px;
        font-weight: 500;
        text-transform: uppercase;
        line-height: 1;
        font-family: 'Roboto Condensed', sans-serif;
      }
      &-action{
        margin: 0;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 2px;
        color: #3CB371;
        font-family: 'Roboto Condensed', sans-serif;
      }
      &-percent-block{
        margin-bottom: 10px;
        line-height: 1;
        color: #fff;
      }
      &-percent{
        font-size: 70px;
        font-family: 'Roboto Condensed', sans-serif;
        &-symb{
          font-size: 30px;
        }
        &-frase{
          font-size: 25px;
        }
      }
      &-after{
        margin: 0;
        text-transform: uppercase;
        padding: 5px 0;
        font-size: 12px;
        border-top: 1px solid rgba(250,250,250,.3);
        border-bottom: 1px solid rgba(250,250,250,.3);
        color: rgba(250,250,250,.3);
      }
    }
  }

  .enableModal-enter-active {
    transition: all .3s ease;
  }
  .enableModal-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .enableModal-enter, .enableModal-leave-to {
    opacity: 0;
  }
</style>