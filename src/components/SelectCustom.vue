<template>
  <div class="search-block select" :class="customClass">
    <label class="search-block__label">
      {{label}}
    </label>
    <div class="search-block__active" @click="showList=!showList" v-click-outside="hide">
      <span>
        {{choosedItem!='' ? $tc('placeholdersAdd.' + placeholderAdd + 'Choose', choosedItem) : placeholderValue}}
      </span>
    </div>
    <transition name="fadeInList">
      <div class="search-block__list" v-if="showList">
        <ul>
          <li v-for="option in options" :key="option.id" @click="returnItem(option)">{{option}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue';

  let hideModals;
  Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      hideModals = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', hideModals)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', hideModals)
    }
  });

  export default {
    props: ['customClass','label', 'options', 'placeholderValue', 'placeholderAdd'],
    data(){
      return{
        choosedItem: '',
        showList: false
      }
    },
    methods:{
      returnItem(item){
        this.choosedItem=item;
        this.showList=false;
        this.$emit('input', item);
      },
      hide () {
        this.showList = false
      }
    },
    /*computed:{
      placeholderAddLang(item){
        let two = this.placeholderAdd;
        let twoStr = 'placeholders.'+two+'Choose';
        let yy = this.$i18n.tc(twoStr, item);
        // console.log(yy);
        // console.log(twoStr);
        // console.log('two',two);
        // return one;
        // console.log(item);
        return this.$i18n.t('placeholders.datePickerPlaceholder');
      }
    }*/
  }
</script>

<style lang="scss">
  .search-block{
    &.select{
      .search-block__active{
        padding-right: 25px;
        cursor: pointer;
      }
      .search-block__active:after{
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        right: 8px;
        width: 8px;
        height: 8px;
        border-right: 1px solid #333;
        border-bottom: 1px solid #333;
        transform: rotate(45deg);
      }
    }
    &.people{
      .search-block__active:before{
        background-image: url("../assets/icons/search-people.png");
      }
      @include lg{
        width: calc(50% - 30px);
      }
      @include sm{
        width: 100%;
      }
    }
    &.room{
      .search-block__active:before{
        background-image: url("../assets/icons/search-room.png");
      }
      @include lg{
        width: calc(50% - 30px);
      }
      @include sm{
        width: 100%;
      }
    }
    &.duration{
      .search-block__active:before{
        background-image: url("../assets/icons/search-duration.png");
      }
      @include lg{
        width: calc(50% - 30px);
      }
      @include sm{
        width: 100%;
      }
    }
  }
  .fadeInList-enter-active{
    animation: fadeInList .5s;
  }
  .fadeInList-leave-active{
    animation: fadeInList .3s reverse;
  }
  @keyframes fadeInList{
    0%{
      -webkit-transform: translateY(10px);
      -moz-transform: translateY(10px);
      -ms-transform: translateY(10px);
      -o-transform: translateY(10px);
      transform: translateY(10px);
    }
    100%{
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }
</style>